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

exports.publicRules = async (datetime, court, players, duration) => {
  const utcDatetime = dayjs.utc(datetime);

  // Database Queries

  // Check min and max number of players
  if (players.length < 2) {
    return {
      success: false,
      message: "Must have at least 2 players on the booking",
    };
  }

  if (players.length > 4) {
    return {
      success: false,
      message: "Must have 4 or less players on the booking",
    };
  }

  // Check booking is within allowed hours
  // TODO!

  // Check booking is within allowed durations
  // TODO!

  return {
    success: true,
    message: "Public rules checks have passed",
  };
};
