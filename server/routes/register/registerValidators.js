const { body } = require("express-validator");

exports.registerValidator = [
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("Must be between 2 and 255 characters"),
  body("lastName", "Last name is invalid")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isString()
    .isLength({
      min: 2,
      max: 255,
    })
    .withMessage("Must be between 2 and 255 characters"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isString()
    .isLength({
      min: 0,
      max: 255,
    })
    .withMessage("Must be under 255 characters"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage("Password not strong enough"),
  body("dateOfBirth")
    .exists({ checkFalsy: true })
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a date"),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),
  body("preAddr")
    .isString()
    .isLength({
      min: 0,
      max: 255,
    })
    .withMessage("Must be under 255 characters"),
  body("streetAddr")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required")
    .isString()
    .isLength({
      min: 0,
      max: 255,
    })
    .withMessage("Must be between under 255 characters"),
  body("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required")
    .isString()
    .isLength({
      min: 0,
      max: 255,
    })
    .withMessage("Must be under 255 characters"),
  body("province")
    .exists({ checkFalsy: true })
    .withMessage("Province is required")
    .isString()
    .isLength({
      min: 0,
      max: 255,
    })
    .withMessage("Must be under 255 characters"),
  body("postalCode", "Invalid postal code")
    .if(body("postalCode").notEmpty())
    .isPostalCode("CA"),
  body("phonePrimary", "Invalid phone number")
    .exists({ checkFalsy: true })
    .withMessage("Phone number is required")
    .isString()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ),
  body("phoneOther", "Invalid phone number")
    .isString()
    .if(body("phoneOther").exists({ checkFalsy: true }))
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ),
  body("emergencyName")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact is required")
    .isString()
    .isLength({
      min: 0,
      max: 50,
    })
    .withMessage("Must be under 50 characters"),
  body("emergencyPhone")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact is required")
    .isString()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .withMessage("Invalid phone number"),
  body("family.*.firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("Must be between 2 and 255 characters"),
  body("family.*.lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("Must be between 2 and 255 characters"),
  body("family.*.dateOfBirth")
    .exists({ checkFalsy: true })
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a date"),
  body("family.*.gender")
    .exists({ checkFalsy: true })
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),
];

exports.verifyValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isString(),
  body("code").exists({ checkFalsy: true }).withMessage("Must provide code"),
];

exports.resendValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isString(),
];
