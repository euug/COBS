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

dayjs.tz.setDefault("US/Pacific");

exports.publicCheck = async (datetime, court, players, duration) => {
  const dt = dayjs(datetime).utc("z").local().tz("Canada/Pacific");

  // Database Queries
  const bookingSettings = await prisma.bookingSettings.findMany();

  // TODO: Change to unique after pushing the database schema
  const bookingRangeByDay = await prisma.bookingRangeByDay.findFirst({
    where: {
      dayOfWeek: dt.format("dddd"),
    },
  });

  console.log(dayjs(datetime).startOf("day").toISOString());
  console.log(dayjs(datetime).endOf("day").toISOString());

  const existingBookings = await prisma.booking.findMany({
    where: {
      court: {
        name: court.name,
      },
      datetime: {
        gte: dayjs(datetime).startOf("day").toISOString(),
        lte: dayjs(datetime).endOf("day").toISOString(),
      },
    },
  });

  console.log(existingBookings);

  // Check start time minutes is within booking interval + seconds and millliseconds are 0
  if (
    dayjs(datetime).minute() %
      Number(
        bookingSettings.find((setting) => setting.name == "bookingIncrement")
          .value
      ) !=
      0 &&
    dt.second() != 0 &&
    dt.millisecond() != 0
  ) {
    return {
      success: false,
      message: "booking time is not compatible with booking grid",
    };
  }

  if (
    dt.isBefore(
      dt
        .year(dt.year())
        .month(dt.month())
        .date(dt.date())
        .hour(bookingRangeByDay.startTimeHour)
        .minute(bookingRangeByDay.startTimeMinute)
    ) ||
    dt.isAfter(
      dt
        .year(dt.year())
        .month(dt.month())
        .date(dt.date())
        .hour(bookingRangeByDay.endTimeHour)
        .minute(bookingRangeByDay.endTimeMinute)
    )
  ) {
    return {
      success: false,
      message: "booking is not within business hours",
    };
  }

  // Check users are active
  // TODO!

  // Check consecutive hours
  // TODO!

  // Check overlapped courts
  bookingRanges = existingBookings.map((booking) => {
    return {
      start: dayjs(booking.datetime).subtract(8, "h"),
      end: dayjs(booking.datetime).subtract(8, "h").add(duration, "minute"),
    };
  });

  if (
    bookingRanges.filter((booking) => {
      return !(
        booking.end.isSameOrBefore(dt_pst) &&
        booking.start.isSameOrAfter(dt_pst.add(duration, "minute"))
      );
    })
  ) {
    return {
      success: false,
      message: "booking overlaps with existing booking(s)",
    };
  }

  return {
    success: true,
    message: "Sanity checks have passed",
  };

  // Check for own overlap
};
