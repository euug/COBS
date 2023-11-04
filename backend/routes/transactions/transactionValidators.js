const { body } = require("express-validator");

exports.postProgramsValidator = [
  body("minAge", "minAge must be an integer between 0 and 999")
    .isInt({
      min: 0,
      max: 999,
    })
    .toInt(),
  body("maxAge", "maxAge must be an integer between 0 and 999")
    .isInt({
      min: 0,
      max: 999,
    })
    .toInt(),
];
