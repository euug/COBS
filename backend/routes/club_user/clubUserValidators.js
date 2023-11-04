const { body } = require("express-validator");

exports.postClubUserTypeValidator = [
  body("type", "Invalid club user type")
    .isString()
    .isLength({ min: 0, max: 63 }),
  body("subtype", "Invalid club user subtype")
    .isString()
    .isLength({ min: 0, max: 63 }),
];
