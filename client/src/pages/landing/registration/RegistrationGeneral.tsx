import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Button,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Date libraries
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// React Hook Form
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generalSchema } from "../../../features/registration/validationSchema";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  updateConfirmPassword,
  updateDateBirth,
  updateEmail,
  updateFirstName,
  updateGender,
  updateLastName,
  updatePassword,
} from "../../../features/registration/sliceRegistration";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

// Defining stepper_steps
import { stepperSteps } from "../../../features/registration/stepperSteps";
import dayjs from "dayjs";

const currentStep: number = 0;

// Interface for data
type FormValues = {
  gender: string;
  dateOfBirth: string;
  passwordConfirm: string;
  password: string;
  email: string;
  lastName: string;
  firstName: string;
};

function RegistrationGeneral() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generalSchema),
    defaultValues: {
      firstName: selector.firstName,
      lastName: selector.lastName,
      email: selector.email,
      password: selector.password,
      passwordConfirm: selector.confirmPassword,
      gender: selector.gender,
    },
  });
  const watchedPassword = useWatch({ control, name: "password" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(updateFirstName(data.firstName));
    dispatch(updateLastName(data.lastName));
    dispatch(updateEmail(data.email));
    dispatch(updatePassword(data.password));
    dispatch(updateConfirmPassword(data.passwordConfirm));
    dispatch(updateDateBirth(data.dateOfBirth));
    dispatch(updateGender(data.gender));

    navigate("/register/contactform");
    window.scrollTo(0, 0);
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
        <Typography variant="h3">General Information</Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <TextField
            required
            id="first-name"
            label="First name"
            variant="outlined"
            fullWidth
            autoFocus
            {...register("firstName")}
            error={errors.firstName ? true : false}
            helperText={
              typeof errors.firstName?.message == "string"
                ? errors.firstName?.message
                : " "
            }
          />
          <TextField
            required
            id="last-name"
            label="Last name"
            variant="outlined"
            fullWidth
            {...register("lastName")}
            error={errors.lastName ? true : false}
            helperText={
              typeof errors.lastName?.message == "string"
                ? errors.lastName?.message
                : " "
            }
          />
        </Stack>
        <TextField
          required
          id="email"
          label="Email address"
          variant="outlined"
          fullWidth
          {...register("email")}
          error={errors.email ? true : false}
          helperText={
            typeof errors.email?.message == "string"
              ? errors.email?.message
              : " "
          }
        />
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <Stack width="100%">
            <TextField
              required
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
              helperText={
                typeof errors.password?.message == "string"
                  ? errors.password?.message
                  : " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              id="confirm-password"
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              {...register("passwordConfirm")}
              error={errors.passwordConfirm ? true : false}
              helperText={
                typeof errors.passwordConfirm?.message == "string"
                  ? errors.passwordConfirm?.message
                  : " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack pt={1} width="100%">
            <Paper sx={{ backgroundColor: "#F1F2ED" }}>
              <Box p={1}>
                <List dense disablePadding>
                  <ListItem>
                    {watchedPassword.length < 8 ? (
                      <ListItemIcon>
                        <ClearIcon color="error" fontSize="small" />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText primary="Must be at least 8 characters long" />
                  </ListItem>
                  <ListItem>
                    {watchedPassword.toUpperCase() == watchedPassword ? (
                      <ListItemIcon>
                        <ClearIcon color="error" fontSize="small" />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText primary="Must have at least 1 lowercase character" />
                  </ListItem>
                  <ListItem>
                    {watchedPassword.toLowerCase() == watchedPassword ? (
                      <ListItemIcon>
                        <ClearIcon color="error" fontSize="small" />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText primary="Must have at least 1 uppercase character" />
                  </ListItem>
                  <ListItem>
                    {/\d/.test(watchedPassword) ? (
                      <ListItemIcon>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon>
                        <ClearIcon color="error" fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText primary="Must include at least 1 number" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Stack>
        </Stack>
        <Controller
          control={control}
          rules={{ required: true }}
          name="dateOfBirth"
          defaultValue=" "
          render={({ field }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  disableFuture
                  value={dayjs(field.value)}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(dayjs(date).toISOString());
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      error: errors.dateOfBirth ? true : false,
                      helperText:
                        typeof errors.dateOfBirth?.message == "string"
                          ? errors.dateOfBirth?.message
                          : " ",
                    },
                  }}
                  sx={{ maxWidth: 500 }}
                />
              </LocalizationProvider>
            );
          }}
        />
        <Box>
          <FormControl required>
            <FormLabel id="gender-radios">Gender</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Box>

        {/* Form Buttons */}
        <Box display="flex" justifyContent="center" my={5}>
          <Button component={Link} to="/" sx={{ marginRight: 5 }}>
            Cancel
          </Button>

          <Button type="submit" color="secondary" variant="contained">
            Next step
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default RegistrationGeneral;
