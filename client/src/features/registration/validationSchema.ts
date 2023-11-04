import { string, object, ref, lazy, StringSchema } from "yup";

export const generalSchema = object({
  firstName: string()
    .trim()
    .required("Required")
    .min(2, "Too short!")
    .max(100, "Too long!"),
  lastName: string()
    .trim()
    .required("Required")
    .min(2, "Too short!")
    .max(100, "Too long!"),
  email: string()
    .trim()
    .required("Required")
    .max(150, "Too long!")
    .email("Invalid email"),
  password: string()
    .required("Required")
    .min(8, "Password too short")
    .max(20, "Password too long")
    .matches(/[a-z]+/, "At least one lowercase character")
    .matches(/[A-Z]+/, "At least one uppercase character")
    .matches(/\d+/, "At least one number"),
  passwordConfirm: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords must match"),
  dateOfBirth: string().required("Required"),
  gender: string().required("Gender is required"),
});

export const contactSchema = object({
  preAddr: lazy((value) =>
    !value
      ? (string() as StringSchema<string>)
      : (string().max(20, "Too long!") as StringSchema<string>)
  ),
  streetAddr: string()
    .required("Required")
    .min(2, "Too short!")
    .max(64, "Too long!"),
  city: string().required("Required").max(50, "Too long!"),
  province: string().required("Required"),
  postalCode: lazy((value) =>
    !value
      ? (string() as StringSchema<string>)
      : (string().matches(
          /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
          "Invalid format"
        ) as StringSchema<string>)
  ),
  phonePrimary: string()
    .required("Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    ),
  phoneOther: lazy((value) =>
    !value
      ? (string() as StringSchema<string>)
      : (string().matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Invalid phone number"
        ) as StringSchema<string>)
  ),
  emergencyName: string().required("Required").max(64),
  emergencyPhone: string()
    .required("Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    ),
});

export const familySchema = object({
  firstName: string()
    .trim()
    .required("Required")
    .min(1, "Too short!")
    .max(50, "Too long!"),
  lastName: string()
    .trim()
    .required("Required")
    .min(1, "Too short!")
    .max(50, "Too long!"),
  dateOfBirth: string().required("Required"),
  gender: string().required("Gender is required"),
  allergiesMedications: lazy((value) =>
    !value
      ? (string() as StringSchema<string>)
      : (string().max(200, "Too long!") as StringSchema<string>)
  ),
  conditionsDisabilities: lazy((value) =>
    !value
      ? (string() as StringSchema<string>)
      : (string().max(200, "Too long!") as StringSchema<string>)
  ),
});

export const verifySchema = object({
  email: string().trim().required("Required").email("Must be valid email"),
  code: string().required("Required").matches(/^\d+$/, "Invalid format"),
});
