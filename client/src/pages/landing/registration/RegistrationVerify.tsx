import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  Collapse,
  IconButton,
  AlertColor,
} from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchema } from "../../../features/registration/validationSchema";

// React Router
import { Link } from "react-router-dom";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateEmail } from "../../../features/registration/sliceRegistration";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";

import { resendCode } from "../../../features/auth/auth";

function RegistrationVerify() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const {
    register,

    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      email: selector.email,
      code: "",
    },
  });

  const handleEmailChange = (value: string) => {
    dispatch(updateEmail(value));
    setValue("email", selector.email);
  };

  async function resendConfirmationCode(email: string) {
    setAlertOpen(false);
    setAlertMsg("");

    try {
      await resendCode(email);
      setSeverity("success");
      setAlertOpen(true);
      setAlertMsg("Verification code resent.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      setSeverity("error");
      setAlertOpen(true);
      setAlertMsg(e.message);
    }
  }

  return (
    <Box mb={10}>
      <Collapse in={alertOpen}>
        <Alert
          severity={severity}
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
          {alertMsg}
        </Alert>
      </Collapse>
      {/* Form */}
      <Typography variant="h3">Verify Email</Typography>
      <Typography variant="body1" maxWidth={800}>
        Please check your email to receive a verification code and allow a few
        minutes for its arrival.
      </Typography>
      <Link to="/login">
        <Button variant="contained" startIcon={<LoginIcon />}>
          Login
        </Button>
      </Link>
      <Typography mt={3} variant="h6">
        Haven't gotten the verification code yet?
      </Typography>
      <Stack mt={1} direction="column">
        <TextField
          required
          id="email"
          label="Email address"
          variant="outlined"
          {...register("email")}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          sx={{ maxWidth: 800 }}
        />
      </Stack>

      {/* Form Buttons */}
      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => resendConfirmationCode(selector.email)}
        >
          Resend code
        </Button>
      </Box>
    </Box>
  );
}

export default RegistrationVerify;
