import { string, object } from "yup";

export const bugSchema = object({
  name: string()
    .trim()
    .required("Required")
    .min(2, "Too short!")
    .max(100, "Too long!"),
  issue: string(),
  specify: string(),
  description: string(),
});
