import { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Button,
  Fab,
} from "@mui/material";

// React Router
import { Link } from "react-router-dom";

// Redux Toolkit
import { useAppSelector } from "../../../hooks/reduxHooks";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Custom components
import FamilyCard from "../../../features/registration/components/FamilyCard";
import AddFamilyDialog from "../../../features/registration/components/AddFamilyDialog";

// Defining stepper_steps
import { stepperSteps } from "../../../features/registration/stepperSteps";
const currentStep: number = 2;

function RegistrationContact() {
  const selector = useAppSelector((state) => state.registration);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
        <Typography variant="h3">Family Members</Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          {selector.family.map((member, index) => (
            <FamilyCard
              key={index}
              index={index}
              fullName={`${member["firstName"]} ${member["lastName"]}`}
              firstLetter={member["firstName"].charAt(0)}
              dateBirth={member["dateBirth"]}
            />
          ))}
        </Stack>
        <Fab
          sx={{ my: 2 }}
          variant="extended"
          aria-label="add"
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add family member
        </Fab>

        {/* Add Family Member Modal */}
        <AddFamilyDialog open={open} openChanger={setOpen} />
      </Box>

      {/* Form Buttons */}
      <Box display="flex" justifyContent="center" my={5}>
        <Button
          component={Link}
          to="/register/contactform"
          sx={{ marginRight: 5 }}
        >
          Back
        </Button>

        <Button
          component={Link}
          to="/register/picture"
          color="secondary"
          variant="contained"
        >
          Next step
        </Button>
      </Box>
    </>
  );
}

export default RegistrationContact;
