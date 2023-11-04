const prisma = require("../../prisma/db.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

exports.formatBookings = async (bookingData, clubUserType, date) => {
  const currentTime = dayjs(new Date()).format("MMMM DD YYYY, HH:MM");

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

    console.log(courtRules);

    const bookingRange = await prisma.bookingRangeByDay.findMany();

    const start = dayjs(
      bookingRange.find((day) => day.dayOfWeek == date.format("dddd")).startTime
    ).hour();

    const end = dayjs(
      bookingRange.find((day) => day.dayOfWeek == date.format("dddd")).endTime
    ).hour();

    courtRules.forEach((court) => {
      const bookings = bookingData.filter((b) => {
        return b.court.id == court.court.id;
      });

      let loop = date.startOf("d").hour(start);
      const endLoop = date.startOf("d").hour(end);

      while (loop.isBefore(endLoop)) {
        let loopBooking = bookings.find((b) => {
          return loop.isSame(dayjs(b.datetime));
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

          const isBookable = bookableTime.isBefore(currentTime)
            ? loop.isAfter(currentTime)
              ? true
              : false
            : false;

          Object.prototype.hasOwnProperty.call(
            formattedList,
            `${court.court.name}`
          )
            ? formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loop.toDate(),
                duration: Number(bookingIncrement.value),
                isBooked: false,
                canBook: isBookable,
                bookableTime: bookableTime,
              })
            : ((formattedList[`${court.court.name}`] = []),
              formattedList[`${court.court.name}`].push({
                court: court.court,
                datetime: loop.toDate(),
                duration: Number(bookingIncrement.value),
                isBooked: false,
                canBook: isBookable,
                bookableTime: bookableTime,
              }));

          loop = loop.add(bookingIncrement.value, "minute");
        }
      }
    });

    return formattedList;
  } catch (e) {
    console.log(e);
  }
};
