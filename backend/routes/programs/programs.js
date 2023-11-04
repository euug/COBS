const express = require("express");
const prisma = require("../../prisma/db.js");
const { validationResult } = require("express-validator");
const validators = require("./programValidators.js");

const router = express.Router();

router
  .route("/")
  .post(validators.postProgramsValidator, async (req, res) => {
    // Check if validation has errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await prisma.program
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

    responseData = await prisma.program.findMany({
      include: {
        session: true,
      },
    });

    res.json(responseData);
  });

router
  .route("/type")
  .post(validators.postProgramTypesValidator, async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await prisma.programType
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

    responseData = await prisma.programType.findMany();

    res.json(responseData);
  });

router.route("/adult/:id?").get(async (req, res) => {
  let responseData;

  if (req.params.id) {
    responseData = await prisma.session.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        program: true,
        coach: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        transactions: true,
      },
    });
  } else {
    if (req.query.id) {
      responseData = await prisma.session.findUnique({
        where: {
          id: req.query.id,
        },
        include: {
          program: true,
          coach: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          transactions: true,
        },
      });
    }
  }

  if (responseData === undefined) {
    responseData = await prisma.program.findMany({
      include: {
        session: {
          include: {
            transactions: true,
          },
        },
      },
    });
  }

  res.json(responseData);
});

module.exports = router;
