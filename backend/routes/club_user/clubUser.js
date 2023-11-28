const express = require("express");
const prisma = require("../../prisma/db.js");

// Validation
const { validationResult } = require("express-validator");
const validators = require("./clubUserValidators.js");
const { validateAuth } = require("../../auth/validateAuth.js");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const validateResponse = await validateAuth(req.headers.authorization);

  if (validateResponse.success) {
    if (validateResponse.response["cognito:groups"][0] == "Member") {
      responseData = await prisma.clubUser.findMany({
        where: {
          isActive: true,
          username: {
            not: validateResponse.response.username,
          },
          clubUserType: {
            type: {
              notIn: ["Staff, Coach"],
            },
          },
        },
        select: {
          firstName: true,
          lastName: true,
          id: true,
          clubUserType: true,
        },
      });
    }
    // If user is not a member
    else {
      responseData = await prisma.clubUser.findMany({
        where: {
          isActive: true,
          username: {
            not: validateResponse.response.username,
          },
          clubUserType: {
            type: {
              notIn: ["Member", "Staff", "Coach"],
            },
          },
        },
        select: {
          firstName: true,
          lastName: true,
          id: true,
          clubUserType: true,
        },
      });
    }
  }

  res.json(responseData);
});

router.route("/current-user").get(async (req, res) => {
  const validateResponse = await validateAuth(req.headers.authorization);

  if (validateResponse.success) {
    responseData = await prisma.clubUser.findUnique({
      where: {
        username: validateResponse.response.username,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
        clubUserType: true,
        favouritePlayers: true,
      },
    });
  }

  res.json(responseData);
});

router
  .route("/type")
  .post(validators.postClubUserTypeValidator, async (req, res) => {
    // Check if validation has errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await prisma.clubUserType
        .create({
          data: req.body,
        })
        .then(async () => {
          return res.status(201).send();
        })
        .catch(async (e) => {
          return res.status(500).send("Unable to save record: " + e);
        });
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  })
  .get(async (_req, res) => {
    let responseData;

    responseData = await prisma.clubUserType.findMany();

    res.json(responseData);
  });

router.route("/my-dashboard").get(async (req, res) => {
  let responseData;

  const validateResponse = await validateAuth(req.headers.authorization);

  if (validateResponse.success) {
    responseData = await prisma.clubUser.findUnique({
      where: {
        username: validateResponse.response.username,
      },
      select: {
        clubCredit: true,
        transactions: {
          select: {
            id: true,
            title: true,
            shortDescription: true,
            total: true,
          },
        },
        bookings: {
          select: {
            id: true,
            bookingType: true,
            court: true,
            datetime: true,
            duration: true,
            players: true,
          },
        },
      },
    });
  }

  if (responseData === undefined) {
    responseData = null;
  }

  res.json(responseData);
});

router.route("/registered").get(async (req, res) => {
  let responseData;

  const validateResponse = await validateAuth(req.headers.authorization);

  if (validateResponse.success) {
    responseData = await prisma.clubUser.findUnique({
      where: {
        username: validateResponse.response.username,
      },
      include: {
        transactions: {
          include: {
            session: true,
          },
        },
      },
    });
  }

  if (responseData === undefined) {
    responseData = null;
  }

  res.json(responseData);
});

module.exports = router;
