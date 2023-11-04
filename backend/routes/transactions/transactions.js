const express = require("express");
const prisma = require("../../prisma/db.js");
const { validationResult } = require("express-validator");
const validators = require("./transactionValidators.js");
const { validateAuth } = require("../../auth/validateAuth.js");

const router = express.Router();

router.route("/:transactionid?").get(async (req, res) => {
  const validateResponse = await validateAuth(req.headers.authorization);

  let responseData;

  if (validateResponse.success) {
    if (req.params.transactionid) {
      responseData = await prisma.transaction.findUnique({
        where: {
          id: req.params.transactionid,
          clubUser: {
            is: {
              username: validateResponse.response.username,
            },
          },
        },
        include: {
          paymentMethod: true,
        },
      });
    } else if (req.query.transactionid) {
      responseData = await prisma.transaction.findUnique({
        where: {
          AND: [
            {
              id: req.params.transactionid,
            },
            {
              clubUser: {
                is: {
                  username: validateResponse.response.username,
                },
              },
            },
          ],
        },
        include: {
          paymentMethod: true,
        },
      });
    }

    if (responseData === undefined) {
      responseData = await prisma.transaction.findMany({
        where: {
          clubUser: {
            is: {
              username: validateResponse.response.username,
            },
          },
        },
        include: {
          paymentMethod: true,
        },
      });
    }
  }

  res.json(responseData);
});

router.route("/:transactionid?/pay").put(async (req, res) => {
  const validateResponse = await validateAuth(req.headers.authorization);

  let responseData;

  if (validateResponse.success) {
    if (req.params.transactionid) {
      responseData = await prisma.transaction.update({
        where: {
          id: req.params.transactionid,
          clubUser: {
            is: {
              username: validateResponse.response.username,
            },
          },
        },
        data: {
          status: "Paid",
          paymentMethod: {
            connect: {
              name: req.body.paymentMethod,
            },
          },
          paidDatetime: new Date(),
        },
      });
    } else if (req.query.transactionid) {
      responseData = await prisma.transaction.update({
        where: {
          id: req.params.transactionid,
          clubUser: {
            is: {
              username: validateResponse.response.username,
            },
          },
        },
        data: {
          status: "Paid",
          paymentMethod: {
            connect: {
              name: req.body.paymentMethod,
            },
          },
        },
      });
    }

    if (responseData === undefined) {
      return res
        .status(500)
        .send("Transaction does not exist with current user");
    }
  }

  res.json(responseData);
});

router.route("/program").post(async (req, res) => {
  // Check user is authorized
  const validateResponse = await validateAuth(req.headers.authorization);

  if (validateResponse.success) {
    const session = await prisma.session.findUnique({
      where: {
        id: req.body.sessionId,
      },
      include: {
        transactions: true,
        program: true,
      },
    });

    const taxAmount = await prisma.transactionSettings.findMany({
      where: {
        name: { in: ["gstAmount", "pstAmount"] },
      },
    });

    let price;

    validateResponse.response["cognito:groups"] == "Member"
      ? (price = session.memberPrice)
      : (price = session.regularPrice);

    const pstAmount = session.isPst
      ? (price * parseFloat(taxAmount[0].value)) /
        (1 + parseFloat(taxAmount[0].value))
      : 0;

    const gstAmount = session.isGst
      ? (price * parseFloat(taxAmount[1].value)) /
        (1 + parseFloat(taxAmount[1].value))
      : 0;

    if (
      session.transactions.filter((t) => t.status == "Paid").length >=
      session.maxSpots
    ) {
      return res
        .status(500)
        .send("Unable to create transaction. Program is full");
    } else {
      await prisma.transaction
        .create({
          data: {
            title: `${session.program.name} - ${session.name}`,
            shortDescription: `Fee for ${session.program.name} - ${session.name}.`,
            description: `Fee for ${session.program.name} - ${session.name}.`,
            status: "Pending",
            isPst: session.isPst,
            isGst: session.isGst,
            pstAmount: pstAmount,
            gstAmount: gstAmount,
            subtotal: price - pstAmount - gstAmount,
            total: price,
            dueDatetime: session.registrationEnd,
            clubUser: {
              connect: {
                username: validateResponse.response.username,
              },
            },
            feeType: {
              connect: {
                type_subtype: {
                  type: "Program Fee",
                  subtype: "Adult Clinic",
                },
              },
            },
            glCode: {
              connect: {
                number: 2150,
              },
            },
            session: {
              connect: {
                id: session.id,
              },
            },
          },
        })
        .then(async (response) => {
          console.log(response);
          return res.status(201).send(response);
        })
        .catch(async (e) => {
          console.log(e);
          return res.status(500).send("Unable to save record: " + e);
        });
    }
  }
});

router.route("/transaction-settings/tax").get(async (_req, res) => {
  let responseData;

  responseData = await prisma.transactionSettings.findMany({
    where: {
      name: { in: ["gstAmount", "pstAmount"] },
    },
  });

  res.json(responseData);
});

module.exports = router;
