import {
  Typography,
  FormControl,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Button,
} from "@mui/material";

import InputMask from "react-input-mask";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  updateCity,
  updateEmergencyName,
  updateEmergencyPhone,
  updateOtherPhone,
  updatePhone,
  updatePostalCode,
  updatePreAddr,
  updateProvince,
  updateStreetAddr,
} from "../../../features/registration/sliceRegistration";

// React Hook Form
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../../../features/registration/validationSchema";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Defining stepper_steps
import { stepperSteps } from "../../../features/registration/stepperSteps";
const currentStep: number = 1;

// Interface for data
type FormValues = {
  preAddr: string;
  streetAddr: string;
  city: string;
  province: string;
  postalCode: string;
  phonePrimary: string;
  phoneOther: string;
  emergencyName: string;
  emergencyPhone: string;
};

function RegistrationContact() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      preAddr: selector.preAddr,
      streetAddr: selector.streetAddr,
      city: selector.city,
      province: selector.province,
      postalCode: selector.postalCode,
      phonePrimary: selector.phone,
      phoneOther: selector.otherPhone,
      emergencyName: selector.emergencyName,
      emergencyPhone: selector.emergencyPhone,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(updatePreAddr(data.preAddr));
    dispatch(updateStreetAddr(data.streetAddr));
    dispatch(updateCity(data.city));
    dispatch(updateProvince(data.province));
    dispatch(updatePostalCode(data.postalCode));
    dispatch(updatePhone(data.phonePrimary));
    dispatch(updateOtherPhone(data.phoneOther));
    dispatch(updateEmergencyName(data.emergencyName));
    dispatch(updateEmergencyPhone(data.emergencyPhone));

    navigate("/register/family");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Typography variant="h3">Contact Information</Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <TextField
            id="pre-addr"
            label="Unit/suite/apt"
            variant="outlined"
            autoFocus
            {...register("preAddr")}
            error={errors.preAddr ? true : false}
            helperText={
              typeof errors.preAddr?.message == "string"
                ? errors.preAddr?.message
                : ""
            }
            sx={{ width: "30%" }}
            margin="dense"
          />
          <TextField
            required
            id="street-addr"
            label="Street address"
            variant="outlined"
            fullWidth
            {...register("streetAddr")}
            error={errors.streetAddr ? true : false}
            helperText={
              typeof errors.streetAddr?.message == "string"
                ? errors.streetAddr?.message
                : ""
            }
          />
        </Stack>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <TextField
            required
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            {...register("city")}
            error={errors.city ? true : false}
            helperText={
              typeof errors.city?.message == "string"
                ? errors.city?.message
                : ""
            }
          />
          <FormControl required fullWidth>
            <InputLabel id="province-label">Province</InputLabel>
            <Controller
              name="province"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  labelId="province-label"
                  id="province"
                  label="Province"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={"BC"}>British Columbia</MenuItem>
                  <MenuItem value={"AB"}>Alberta</MenuItem>
                  <MenuItem value={"SK"}>Saskatchewan</MenuItem>
                  <MenuItem value={"MB"}>Manitoba</MenuItem>
                  <MenuItem value={"ON"}>Ontario</MenuItem>
                  <MenuItem value={"QC"}>Quebec</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            control={control}
            name="postalCode"
            render={({ field }) => (
              <InputMask
                mask={"a9a 9a9"}
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
              >
                <TextField
                  label="Postal code"
                  variant="outlined"
                  fullWidth
                  error={errors.postalCode ? true : false}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                  }}
                  helperText={
                    typeof errors.postalCode?.message == "string"
                      ? errors.postalCode?.message
                      : ""
                  }
                />
              </InputMask>
            )}
          />
        </Stack>
        <Typography variant="h3">Primary Phone</Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <Controller
            control={control}
            name="phonePrimary"
            rules={{ required: true }}
            render={({ field }) => (
              <InputMask
                mask="999-999-9999"
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
              >
                <TextField
                  required
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                  error={errors.phonePrimary ? true : false}
                  helperText={
                    typeof errors.phonePrimary?.message == "string"
                      ? errors.phonePrimary?.message
                      : ""
                  }
                />
              </InputMask>
            )}
          />
          <Controller
            control={control}
            name="phoneOther"
            render={({ field }) => (
              <InputMask
                mask="999-999-9999"
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
              >
                <TextField
                  label="Other phone"
                  variant="outlined"
                  fullWidth
                  error={errors.phoneOther ? true : false}
                  helperText={
                    typeof errors.phoneOther?.message == "string"
                      ? errors.phoneOther?.message
                      : ""
                  }
                />
              </InputMask>
            )}
          />
        </Stack>
        <Typography variant="h3">Emergency Contact</Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <TextField
            required
            id="emergency-name"
            label="Contact name"
            variant="outlined"
            fullWidth
            {...register("emergencyName")}
            error={errors.emergencyName ? true : false}
            helperText={
              typeof errors.emergencyName?.message == "string"
                ? errors.emergencyName?.message
                : ""
            }
          />
          <Controller
            control={control}
            name="emergencyPhone"
            rules={{ required: true }}
            render={({ field }) => (
              <InputMask
                mask="999-999-9999"
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
              >
                <TextField
                  label="Contact number"
                  variant="outlined"
                  fullWidth
                  required
                  error={errors.emergencyPhone ? true : false}
                  helperText={
                    typeof errors.emergencyPhone?.message == "string"
                      ? errors.emergencyPhone?.message
                      : ""
                  }
                />
              </InputMask>
            )}
          />
        </Stack>
      </Box>

      {/* Form Buttons */}
      <Box display="flex" justifyContent="center" my={5}>
        <Button component={Link} to="/register" sx={{ marginRight: 5 }}>
          Back
        </Button>

        <Button type="submit" color="secondary" variant="contained">
          Next step
        </Button>
      </Box>
    </form>
  );
}

export default RegistrationContact;
