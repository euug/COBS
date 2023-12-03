const prisma = require("../../prisma/db.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

exports.publicCheck = async (datetime, court, players, duration) => {
  const utcDatetime = dayjs.utc(datetime);

  // Database Queries
  const bookingSettings = await prisma.bookingSettings.findMany({});

  const bookingRangeByDay = await prisma.bookingRangeByDay.findUnique({
    where: {
      dayOfWeek: utcDatetime.format("dddd"),
    },
  });

  const existingBookings = await prisma.booking.findMany({
    where: {
      courtId: court.id,
      datetime: {
        gte: utcDatetime.startOf("day").toISOString(),
        lte: utcDatetime.endOf("day").toISOString(),
      },
    },
  });

  const ownBookings = await prisma.booking.findMany({
    where: {
      datetime: {
        gte: utcDatetime.startOf("day").toISOString(),
        lte: utcDatetime.endOf("day").toISOString(),
      },
      players: {
        some: {
          id: { in: players.map((player) => player.id) },
        },
      },
    },
    include: {
      players: true,
    },
  });

  const listPlayers = await prisma.clubUser.findMany({
    where: {
      id: { in: players.map((player) => player.id) },
    },
  });

  // Check start time minutes is within booking interval + seconds and millliseconds are 0
  if (
    utcDatetime.minute() %
      Number(
        bookingSettings.find((setting) => setting.name == "bookingIncrement")
          .value
      ) !=
      0 &&
    utcDatetime.second() != 0 &&
    utcDatetime.millisecond() != 0
  ) {
    return {
      success: false,
      message: "booking time is not compatible with booking grid",
    };
  }

  // Check booking time is within bookable range
  if (
    utcDatetime.isBefore(
      dayjs
        .utc(bookingRangeByDay.startTime)
        .year(utcDatetime.year())
        .month(utcDatetime.month())
        .date(utcDatetime.date())
    ) ||
    utcDatetime
      .add(duration, "minute")
      .isAfter(
        dayjs
          .utc(bookingRangeByDay.endTime)
          .year(utcDatetime.year())
          .month(utcDatetime.month())
          .date(utcDatetime.date())
      )
  ) {
    return {
      success: false,
      message: "booking is not within business hours",
    };
  }

  // Check for inactive players
  if (listPlayers.filter((player) => !player.isActive).length) {
    return {
      success: false,
      message: "one (or more) players are not active",
    };
  }

  // Check overlapped courts
  bookingRanges = existingBookings.map((booking) => {
    return {
      start: dayjs.utc(booking.datetime),
      end: dayjs.utc(booking.datetime).add(booking.duration, "minute"),
    };
  });

  const isOverlap = bookingRanges.filter((booking) => {
    return !(
      booking.end.isSameOrBefore(utcDatetime) ||
      booking.start.isSameOrAfter(utcDatetime.add(duration, "minute"))
    );
  });

  if (isOverlap.length) {
    return {
      success: false,
      message: "booking overlaps with existing booking(s)",
    };
  }

  // Check 30 minute gap with business hours
  if (bookingSettings.find((bs) => bs.name == "gapAllowed").value == "false") {
    // Upper bound check
    const upperLimitGap = utcDatetime.diff(
      dayjs
        .utc(bookingRangeByDay.startTime)
        .year(utcDatetime.year())
        .month(utcDatetime.month())
        .date(utcDatetime.date()),
      "m"
    );
    // Lower bound check
    const lowerLimitGap = dayjs
      .utc(bookingRangeByDay.endTime)
      .year(utcDatetime.year())
      .month(utcDatetime.month())
      .date(utcDatetime.date())
      .diff(utcDatetime.add(duration, "m"), "m");

    if (
      (upperLimitGap > 0 && upperLimitGap < 60) ||
      (lowerLimitGap > 0 && lowerLimitGap < 60)
    ) {
      return {
        success: false,
        message: "booking creates a 30 minute gap and is not allowed.",
      };
    }

    // Check 30 minute gap between bookings
    for (let i = 0; i < existingBookings.length; i++) {
      // Upper bound check
      const upperCourtGap = utcDatetime.diff(
        dayjs
          .utc(existingBookings[i].datetime)
          .add(existingBookings[i].duration, "m"),
        "m"
      );
      // Lower bound check
      const lowerCourtGap = dayjs
        .utc(existingBookings[i].datetime)
        .add(existingBookings[i], "m")
        .diff(utcDatetime.add(duration, "m"), "m");

      if (
        (upperCourtGap > 0 && upperCourtGap < 60) ||
        (lowerCourtGap > 0 && lowerCourtGap < 60)
      ) {
        return {
          success: false,
          message: "booking creates a 30 minute gap and is not allowed.",
        };
      }
    }
  }

  // Check each player for consecutive hours and own overlaps
  for (let i = 0; i < players.length; i++) {
    const playerBookings = ownBookings
      .filter((booking) => {
        return booking.players.some((p) => p.id == players[i].id);
      })
      .map((ob) => {
        return {
          start: dayjs.utc(ob.datetime),
          end: dayjs.utc(ob.datetime).add(ob.duration, "minute"),
          duration: ob.duration,
        };
      });

    // Check own overlap
    const isOverlap = playerBookings.filter((booking) => {
      return !(
        booking.end.isSameOrBefore(utcDatetime) ||
        booking.start.isSameOrAfter(utcDatetime.add(duration, "minute"))
      );
    });

    if (isOverlap.length) {
      return {
        success: false,
        message: `${players[i].firstName} ${players[i].lastName} is overlapping with his/her own existing booking(s)`,
      };
    }

    // Check for own consecutive hours
    playerBookings.push({
      start: utcDatetime,
      end: utcDatetime.add(duration, "minute"),
      duration: duration,
    });

    playerBookings.sort((a, b) => {
      if (a.start.isSameOrBefore(b.start)) {
        return -1;
      } else {
        return 1;
      }
    });

    let reset = true;
    let loopDuration;

    for (let j = 0; j < playerBookings.length; j++) {
      if (reset) {
        loopDuration = playerBookings[j].duration;
      } else {
        loopDuration += playerBookings[j].duration;
      }

      // TODO: make the max duration a setting in the database
      if (loopDuration > 120) {
        return {
          success: false,
          message:
            players[i].firstName +
            " " +
            players[i].lastName +
            " cannot book more than 2 consecutive hours",
        };
      }

      if (
        j < playerBookings.length - 1 &&
        playerBookings[j].end.isSame(playerBookings[j + 1].start)
      ) {
        reset = false;
      } else {
        reset = true;
      }
    }
  }

  return {
    success: true,
    message: "Sanity checks have passed",
  };
};
