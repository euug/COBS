const express = require("express");
const prisma = require("../../prisma/db.js");
const { validationResult } = require("express-validator");
const validators = require("./registerValidators.js");
const signUp = require("../../auth/signUp.js");

const router = express.Router();

router.route("/").post(validators.registerValidator, async (req, res) => {
  // Check if validation has errors
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("just before sign up");
    await signUp
      .signUpPublic(req.body.email, req.body.password)
      .then((result) => {
        prisma.clubUser
          .create({
            data: {
              email: req.body.email,
              username: result.message.userSub, // The sub from Cognito
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              dateOfBirth: req.body.dateOfBirth,
              gender: req.body.gender,
              phonePrimary: req.body.phonePrimary,
              phoneOther: req.body.phoneOther,
              emergencyName: req.body.emergencyName,
              emergencyPhone: req.body.emergencyPhone,
              pictureUse: req.body.pictureUse,
              legalAgreement: req.body.legalAgreement,
              isLeague: false,
              isActive: true,
              expiryDate: null,
              allergiesMedications: req.body.allergiesMedications,
              conditionsDisabilities: req.body.conditionsDisabilities,
              clubCredit: 0.0,
              clubUserType: {
                connect: {
                  type_subtype: {
                    type: "Public",
                    subtype: "General",
                  },
                },
              },
              address: {
                create: {
                  preAddr: req.body.preAddr,
                  streetAddr: req.body.streetAddr,
                  city: req.body.city,
                  province: req.body.province,
                  postalCode: req.body.postalCode,
                },
              },
              family: {
                create: req.body.family.map((f) => {
                  return {
                    email: f.firstName + req.body.email,
                    firstName: f.firstName,
                    username: null,
                    lastName: f.lastName,
                    dateOfBirth: f.dateOfBirth,
                    gender: f.gender,
                    phonePrimary: req.body.phonePrimary,
                    phoneOther: req.body.phoneOther,
                    emergencyName: req.body.emergencyName,
                    emergencyPhone: req.body.emergencyPhone,
                    pictureUse: req.body.pictureUse,
                    legalAgreement: req.body.legalAgreement,
                    isLeague: false,
                    isActive: true,
                    expiryDate: null,
                    allergiesMedications: f.allergiesMedications,
                    conditionsDisabilities: f.conditionsDisabilities,
                    clubCredit: 0.0,
                    clubUserType: {
                      connect: {
                        id: "clo477i2x0000turkygv219gj",
                      },
                    },
                    address: {
                      create: {
                        preAddr: req.body.preAddr,
                        streetAddr: req.body.streetAddr,
                        city: req.body.city,
                        province: req.body.province,
                        postalCode: req.body.postalCode,
                      },
                    },
                  };
                }),
              },
            },
          })
          .then(async () => {
            return res.status(201).send({
              success: true,
              message: "Public user successfully created",
            });
          })
          .catch(async (e) => {
            return res.status(500).send({
              success: false,
              message: "Unable to save record: " + e,
            });
          });
      })
      .catch((e) => {
        return res.status(500).send(e);
      });
  } else {
    res.status(422).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }
});

module.exports = router;
