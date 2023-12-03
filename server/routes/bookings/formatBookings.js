const prisma = require("../../prisma/db.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

exports.formatBookings = async (
  bookingData,
  clubUserType,
  date,
  currentTimestamp
) => {
  try {
    let formattedList = {};

    const bookingIncrement = await prisma.bookingSettings.findUnique({
      where: {
        name: "bookingIncrement",
      },
    });

    const courtRules = await prisma.courtBookingRules.findMany({
      where: {
        clubUserType: {
          type: clubUserType,
        },
      },
      include: {
        court: true,
      },
    });

    const bookingRange = await prisma.bookingRangeByDay.findMany({});

    const startTime = dayjs
      .utc(
        bookingRange.find((day) => day.dayOfWeek == date.format("dddd"))
          .startTime
      )
      .year(date.year())
      .month(date.month())
      .date(date.date());

    const endTime = dayjs
      .utc(
        bookingRange.find((day) => day.dayOfWeek == date.format("dddd")).endTime
      )
      .year(date.year())
      .month(date.month())
      .date(date.date());

    courtRules.forEach((court) => {
      const bookings = bookingData.filter((b) => {
        return b.court.id == court.courtId;
      });

      let loop = startTime;

      while (loop.isBefore(endTime)) {
        let loopBooking = bookings.find((b) => {
          return loop.isSame(dayjs.utc(b.datetime));
        });

        if (loopBooking) {
          Object.prototype.hasOwnProperty.call(
            formattedList,
            `${court.court.name}`
          )
            ? formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loopBooking.datetime,
                duration: loopBooking.duration,
                color: loopBooking.bookingType.color,
                isBooked: true,
                id: loopBooking.id,
              })
            : ((formattedList[`${court.court.name}`] = []),
              formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loopBooking.datetime,
                duration: loopBooking.duration,
                color: loopBooking.bookingType.color,
                isBooked: true,
                id: loopBooking.id,
              }));

          loop = loop.add(loopBooking.duration, "minute");
        } else {
          const bookableTime = loop.subtract(court.freeHoursAhead, "hour");

          const isBookable = bookableTime.isBefore(currentTimestamp)
            ? loop.isAfter(currentTimestamp)
              ? true
              : false
            : false;

          Object.prototype.hasOwnProperty.call(
            formattedList,
            `${court.court.name}`
          )
            ? formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loop.toISOString(),
                duration: Number(bookingIncrement.value),
                isBooked: false,
                canBook: isBookable,
                bookableTime: bookableTime,
              })
            : ((formattedList[`${court.court.name}`] = []),
              formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loop.toISOString(),
                duration: Number(bookingIncrement.value),
                isBooked: false,
                canBook: isBookable,
                bookableTime: bookableTime,
              }));

          loop = loop.add(Number(bookingIncrement.value), "minute");
        }
      }
    });

    return formattedList;
  } catch (e) {
    console.log(e);
  }
};
