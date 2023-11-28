const express = require("express");
const prisma = require("../../prisma/db.js");
const { validationResult } = require("express-validator");
const validators = require("./bookingValidators.js");
const { validateAuth } = require("../../auth/validateAuth.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const { formatBookings } = require("./formatBookings.js");
const { publicCheck } = require("./sanityChecks.js");
const { publicRules } = require("./publicRules.js");

dayjs.extend(utc);

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    // Normalize current date
    const normalizedDateString = dayjs()
      .tz(process.env.TZ) // Set timezone to club's physical location
      .format("YYYY-MM-DDTHH:MM:ss+00:00");

    const currentDate = dayjs(normalizedDateString).utc();

    const validateResponse = await validateAuth(req.headers.authorization);

    if (validateResponse.success) {
      if (validateResponse.response["cognito:groups"][0] == "Public") {
        const sanityCheck = await publicCheck(
          req.body.datetime,
          req.body.court,
          req.body.players,
          60
        );

        console.log(sanityCheck);

        if (!sanityCheck.success) {
          res.status(500).send(sanityCheck);
          return;
        }

        const publicRulesCheck = await publicRules(
          req.body.datetime,
          req.body.court,
          req.body.players,
          60
        );

        console.log(publicRulesCheck);

        if (!publicRulesCheck.success) {
          res.status(500).send(publicRulesCheck);
          return;
        }

        if (sanityCheck.success && publicRulesCheck.success) {
          const allPlayerIds = req.body.players.map((p) => {
            return p.id;
          });

          await prisma.booking
            .create({
              data: {
                datetime: req.body.datetime,
                checkRules: true,
                duration: 60,
                bookingType: {
                  connect: {
                    type_subtype: {
                      type: "Public",
                      subtype: "Regular",
                    },
                  },
                },
                court: {
                  connect: {
                    id: req.body.court.id,
                  },
                },
                players: {
                  connect: allPlayerIds.map((id) => {
                    return { id: id };
                  }),
                },
              },
              include: {
                bookingType: true,
                court: true,
                players: true,
              },
            })
            .then(async () => {
              return res.status(201).send({
                success: true,
                message: "Booking successfully created",
              });
            })
            .catch(async (e) => {
              console.log(e);
              return res.status(500).send({
                success: false,
                message: "Unable to book court: " + e,
              });
            });
        } else {
          res.status(500).send({
            success: false,
            message: "Invalid booking",
          });
        }
      }
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorized request",
      });
    }
  })

  .get(async (req, res) => {
    // Normalize current date
    const normalizedDateString = dayjs()
      .tz(process.env.TZ) // Set timezone to club's physical location
      .format("YYYY-MM-DDTHH:MM:ss+00:00");

    const currentDate = dayjs(normalizedDateString).utc();

    // Validate logged in user
    const validateResponse = await validateAuth(req.headers.authorization);

    let bookingData;

    // Check user's type
    console.log(validateResponse.response["cognito:groups"]);

    // Query if user is a Member type
    if (
      validateResponse.success &&
      validateResponse.response["cognito:groups"] == "Member"
    ) {
      if (req.query.offset) {
        bookingData = await prisma.booking.findMany({
          where: {
            datetime: {
              gte: new Date(
                currentDate.add(req.query.offset, "day").startOf("day")
              ),
              lte: new Date(
                currentDate.add(req.query.offset, "day").endOf("day")
              ),
            },
          },
          select: {
            datetime: true,
            duration: true,
            players: true,
            id: true,
            bookingType: true,
            court: true,
          },
        });
      }

      // Default query for current day
      if (bookingData === undefined) {
        bookingData = await prisma.booking.findMany({
          where: {
            datetime: {
              gte: new Date(currentDate.startOf("day")),
              lte: new Date(currentDate.endOf("day")),
            },
          },
          select: {
            datetime: true,
            duration: true,
            players: true,
            id: true,
            bookingType: true,
            court: true,
          },
        });
      }
    }
    // Non-member query
    else {
      if (req.query.offset) {
        bookingData = await prisma.booking.findMany({
          where: {
            datetime: {
              gte: new Date(
                currentDate.add(req.query.offset, "day").startOf("day")
              ),
              lte: new Date(
                currentDate.add(req.query.offset, "day").endOf("day")
              ),
            },
          },
          select: {
            datetime: true,
            duration: true,
            id: true,
            bookingType: true,
            court: true,
          },
        });
      }

      // Default gets current day's bookings
      if (bookingData === undefined) {
        bookingData = await prisma.booking.findMany({
          where: {
            datetime: {
              gte: new Date(currentDate.startOf("day")),
              lte: new Date(currentDate.endOf("day")),
            },
          },
          select: {
            datetime: true,
            duration: true,
            id: true,
            bookingType: true,
            court: true,
          },
        });
      }
    }

    let responseData;

    try {
      responseData = await formatBookings(
        bookingData,
        validateResponse.response["cognito:groups"][0],
        currentDate.add(req.query.offset, "day").startOf("day"),
        currentDate
      );
    } catch (e) {
      return res.status(200).send({
        "Court 1": [],
        "Court 2": [],
        "Court 3": [],
        "Court 4": [],
        "Court 5": [],
        "Court 6": [],
      });
    }

    res.json(responseData);
  });

router.route("/bookingRangeByDay").get(async (req, res) => {
  let responseData;

  if (req.query.currentDate) {
    const bookingRange = await prisma.bookingRangeByDay.findUnique({
      where: {
        dayOfWeek: dayjs.utc(req.query.currentDate).format("dddd"),
      },
    });

    const startTime = dayjs.utc(bookingRange.startTime);
    const endTime = dayjs.utc(bookingRange.endTime);

    let loop = startTime;
    let rangeArray = [];

    while (loop.isBefore(endTime)) {
      rangeArray.push(loop.format("h:mm a"));

      loop = loop.add(60, "minute");
    }

    responseData = rangeArray;
  }

  if (responseData === undefined) {
    responseData = await prisma.bookingRangeByDay.findMany({});
  }

  console.log(responseData);

  res.json(responseData);
});

module.exports = router;
