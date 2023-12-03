const { body } = require("express-validator");

exports.postBookingValidator = [
  body("bookingType", "booking type must be a string").isString({
    min: 0,
    max: 263,
  }),
  body("court", "court must be a string").isInt({
    min: 0,
    max: 999,
  }),
];
