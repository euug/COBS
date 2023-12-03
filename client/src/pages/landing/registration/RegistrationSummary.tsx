import { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import {
  generalSchema,
  contactSchema,
  familySchema,
} from "../../../features/registration/validationSchema";

import dayjs from "dayjs";
import axios from "axios";

// Icons
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  updateCity,
  updateConfirmPassword,
  updateEmail,
  updateEmergencyName,
  updateEmergencyPhone,
  updateFamily,
  updateFirstName,
  updateGender,
  updateLastName,
  updateLegalAgreement,
  updateOtherPhone,
  updatePassword,
  updatePhone,
  updatePictureAgreement,
  updatePostalCode,
  updatePreAddr,
  updateProvince,
  updateStreetAddr,
} from "../../../features/registration/sliceRegistration";

function RegistrationSummary() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);

  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);

    generalSchema
      .validate({
        firstName: selector.firstName,
        lastName: selector.lastName,
        password: selector.password,
        passwordConfirm: selector.confirmPassword,
        email: selector.email,
        gender: selector.gender,
        dateOfBirth: selector.dateBirth,
      })
      .then(() => {
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });

    contactSchema
      .validate({
        preAddr: selector.preAddr,
        streetAddr: selector.streetAddr,
        city: selector.city,
        province: selector.province,
        postalCode: selector.postalCode,
        phonePrimary: selector.phone,
        phoneOther: selector.otherPhone,
        emergencyName: selector.emergencyName,
        emergencyPhone: selector.emergencyPhone,
      })
      .then(() => {
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });

    selector.family.forEach((f) =>
      familySchema
        .validate({
          firstName: f.firstName,
          lastName: f.lastName,
          dateOfBirth: f.dateOfBirth,
          gender: f.gender,
          allergiesMedications: f.allergiesMedications,
          conditionsDisabilities: f.conditionsDisabilities,
        })
        .then(() => {
          setError(false);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
    );

    if (!error) {
      axios
        .post(import.meta.env.VITE_APP_BACKEND_URL + "/register", {
          email: selector.email,
          firstName: selector.firstName,
          lastName: selector.lastName,
          password: selector.password,
          dateOfBirth: selector.dateBirth,
          gender: selector.gender,
          phonePrimary: selector.phone,
          phoneOther: selector.otherPhone,
          emergencyName: selector.emergencyName,
          emergencyPhone: selector.emergencyPhone,
          pictureUse: selector.pictureAgreement,
          legalAgreement: selector.legalAgreementName,
          allergiesMedications: "",
          conditionsDisabilities: "",
          preAddr: selector.preAddr,
          streetAddr: selector.streetAddr,
          city: selector.city,
          province: selector.province,
          postalCode: selector.postalCode,
          family: selector.family,
        })
        .then((res) => {
          if (res.data.success) {
            navigate("/register/verify");
            window.scrollTo(0, 0);

            // Reset the fields
            dispatch(updateFirstName(""));
            dispatch(updateLastName(""));
            dispatch(updateEmail(""));
            dispatch(updatePassword(""));
            dispatch(updateConfirmPassword(""));
            dispatch(updateGender(""));
            dispatch(updatePreAddr(""));
            dispatch(updateStreetAddr(""));
            dispatch(updateCity(""));
            dispatch(updateProvince(""));
            dispatch(updatePostalCode(""));
            dispatch(updatePhone(""));
            dispatch(updateOtherPhone(""));
            dispatch(updateEmergencyName(""));
            dispatch(updateEmergencyPhone(""));
            dispatch(updatePictureAgreement());
            dispatch(updateLegalAgreement(""));
            dispatch(updateFamily([]));
          } else {
            throw new Error(res.data.error);
          }
        })
        .catch((e) => {
          setAuthError(e.response.data.message);
          setAlertOpen(true);
        });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {authError}
        </Alert>
      </Collapse>
      <Box mb={10}>
        <Typography variant="h3">Summary</Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="column" minWidth={500}>
            <Typography variant="h4" gutterBottom={true}>
              General Information
            </Typography>
            <Stack direction="row">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Full Name
              </Typography>
              <Typography
                color={
                  selector.firstName && selector.lastName ? "inherit" : "red"
                }
                sx={{ width: "50%", m: 0 }}
              >
                {selector.firstName && selector.lastName
                  ? `${selector.firstName} ${selector.lastName}`
                  : "No first or last name"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Email
              </Typography>
              <Typography
                color={selector.email ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.email ? selector.email : "No email"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Birthday
              </Typography>
              <Typography
                color={selector.dateBirth ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.email
                  ? dayjs(selector.dateBirth).format("MMMM D, YYYY")
                  : "No birthday"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontWeight: 600, width: "50%", mb: 4, mt: 0, mx: 0 }}
              >
                Gender
              </Typography>
              <Typography sx={{ width: "50%", m: 0 }}>
                {selector.gender}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" minWidth={500}>
            <Typography variant="h4" gutterBottom={true}>
              Address
            </Typography>
            <Stack direction="row">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Unit/Suite
              </Typography>
              <Typography sx={{ width: "50%", m: 0 }}>
                {selector.preAddr ? selector.preAddr : "N/A"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Street Address
              </Typography>
              <Typography
                color={selector.streetAddr ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.streetAddr ? selector.streetAddr : "No address"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                City
              </Typography>
              <Typography
                color={selector.city ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.city ? selector.city : "No city"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Province
              </Typography>
              <Typography
                color={selector.province ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.province ? selector.province : "No province"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontWeight: 600, width: "50%", mb: 2, mt: 0, mx: 0 }}
              >
                Postal Code
              </Typography>
              <Typography sx={{ width: "50%", m: 0 }}>
                {selector.postalCode ? selector.postalCode : "N/A"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" minWidth={500}>
            <Typography variant="h4" gutterBottom={true}>
              Contact
            </Typography>
            <Stack direction="row">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Main Phone
              </Typography>
              <Typography
                color={selector.phone ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.phone ? selector.phone : "No main phone"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Other Phone
              </Typography>
              <Typography sx={{ width: "50%", m: 0 }}>
                {selector.otherPhone ? selector.otherPhone : "N/A"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Emergency Contact
              </Typography>
              <Typography
                color={selector.emergencyName ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.emergencyName
                  ? selector.emergencyName
                  : "No emergency contact"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontWeight: 600, width: "50%", mb: 5, mt: 0, mx: 0 }}
              >
                Emergency Phone
              </Typography>
              <Typography
                color={selector.emergencyPhone ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.emergencyPhone
                  ? selector.emergencyPhone
                  : "No emergency number"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" minWidth={500}>
            <Typography variant="h4" gutterBottom={true}>
              Family Members
            </Typography>
            {selector.family.length > 0 ? (
              selector.family.map((member, index) => (
                <Stack key={index} direction="row">
                  <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                    {`${member.firstName} ${member.lastName}`}
                  </Typography>
                  <Typography sx={{ width: "50%", m: 0 }}>
                    {dayjs(member.dateOfBirth).format("MMMM D, YYYY")}
                  </Typography>
                </Stack>
              ))
            ) : (
              <Typography variant="body1" gutterBottom>
                No family members
              </Typography>
            )}
          </Stack>

          <Stack direction="column" minWidth={500}>
            <Typography variant="h4" gutterBottom={true}>
              Agreements
            </Typography>
            <Stack direction="row">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Picture Use
              </Typography>
              <Typography sx={{ width: "50%", m: 0 }}>
                {selector.pictureAgreement ? "Agreed" : "Disagree"}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600, width: "50%", m: 0 }}>
                Legal Agreement
              </Typography>
              <Typography
                color={selector.legalAgreementName ? "inherit" : "red"}
                sx={{ width: "50%", m: 0 }}
              >
                {selector.legalAgreementName
                  ? `signed by ${selector.legalAgreementName}`
                  : "No signature"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box display="flex" justifyContent="center" my={5}>
          <Button component={Link} to="/register/legal" sx={{ marginRight: 5 }}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Finish
          </Button>
        </Box>
        <Typography color={"red"} textAlign={"center"}>
          {error
            ? "Invalid submission. Please check your information carefully"
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

export default RegistrationSummary;
