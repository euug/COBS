const express = require("express");
const prisma = require("../../prisma/db.js");
const { validationResult } = require("express-validator");
const validators = require("./bookingValidators.js");
const { validateAuth } = require("../../auth/validateAuth.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const { formatBookings } = require("./formatBookings.js");
const { publicCheck } = require("./sanityChecks.js");

dayjs.extend(utc);

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const validateResponse = await validateAuth(req.headers.authorization);

    if (validateResponse.success) {
      if (validateResponse.response["cognito:groups"][0] == "Public") {
        // const sanityCheck = await publicCheck(
        //   req.body.datetime,
        //   req.body.court,
        //   req.body.players,
        //   60
        // );
        const sanityCheck = { success: true };

        console.log(sanityCheck);

        if (sanityCheck.success) {
          const currentUser = await prisma.clubUser.findFirst({
            where: {
              email: req.body.currentUser,
            },
          });

          const otherPlayerIds = req.body.players.map((p) => {
            return p.id;
          });

          const allPlayerIds = [...otherPlayerIds, currentUser.id];

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
            message: sanityCheck.message,
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
    const validateResponse = await validateAuth(req.headers.authorization);

    const currentDate = dayjs(new Date());

    let bookingData;

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
    } else {
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
        currentDate.add(req.query.offset, "day").startOf("day")
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

    console.log(responseData);

    res.json(responseData);
  });

module.exports = router;
