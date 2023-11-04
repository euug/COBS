import {
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

// React Router
import { Link } from "react-router-dom";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updatePictureAgreement } from "../../../features/registration/sliceRegistration";

// Defining stepper_steps
import { stepperSteps } from "../../../features/registration/stepperSteps";
const currentStep: number = 3;

function RegistrationPicture() {
  const dispatch = useAppDispatch();

  function handleClickCheckbox() {
    dispatch(updatePictureAgreement());
  }

  return (
    <>
      <Box mb={10}>
        {/* Stepper */}
        <Stepper
          sx={{ display: { xs: "none", md: "flex" } }}
          activeStep={currentStep}
        >
          {stepperSteps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step {...stepProps} key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <LinearProgress
          sx={{ display: { xs: "block", md: "none" } }}
          variant="determinate"
          value={(currentStep / stepperSteps.length) * 100}
        />

        {/* Form */}
        <Typography variant="h3">Picture Use</Typography>
        <Stack spacing={{ xs: 0, md: 2 }} direction="column">
          <ul>
            <li>
              <Typography>
                By selecting Yes below I agree that I am signing a release
                hereby giving Burnaby Tennis Club permission to use all pictures
                & electronic images taken of me and my family at the Facilities,
                in all publications as determined by the Club.
              </Typography>
            </li>
            <li>
              <Typography>
                I agree that I have no rights to the pictures, electronic images
                or content that the pictures or electronic images becomes part
                of, and all rights to the photography, electonic images and
                content belong to the Club.
              </Typography>
            </li>
            <li>
              <Typography>
                I agree that all Pictures of me or my family can be used as
                described above.
              </Typography>
            </li>
          </ul>
          <FormControlLabel
            control={
              <Checkbox
                checked={useAppSelector(
                  (state) => state.registration.pictureAgreement
                )}
                onChange={handleClickCheckbox}
              />
            }
            label="Yes, I agree to the terms above"
            labelPlacement="end"
          />
        </Stack>
      </Box>

      {/* Form Buttons */}
      <Box display="flex" justifyContent="center" my={5}>
        <Button component={Link} to="/register/family" sx={{ marginRight: 5 }}>
          Back
        </Button>

        <Button
          component={Link}
          to="/register/legal"
          color="secondary"
          variant="contained"
        >
          Next step
        </Button>
      </Box>
    </>
  );
}

export default RegistrationPicture;
