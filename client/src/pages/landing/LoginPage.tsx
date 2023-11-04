import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// Icons
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { signIn } from "../../features/auth/auth";

function LoginPage() {
  const navigate = useNavigate();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoginError("");
    setAlertOpen(false);
    try {
      await signIn(email, password);
      navigate("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlertOpen(true);
      setLoginError(error.message);
    }
  };

  return (
    <>
      <Toolbar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: { sm: 500, xs: 400 },
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography align="center" variant="h1">
              Login
            </Typography>
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
                {loginError}
              </Alert>
            </Collapse>
            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              fullWidth
              required
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography component={Link} to="/forgot">
                Forgot password?
              </Typography>
            </Stack>
            <Box display="flex" justifyContent="center" marginTop="1rem">
              <Button
                component={Link}
                to="/register"
                sx={{
                  mx: "1rem",
                }}
                variant="outlined"
              >
                Register account
              </Button>
              <Button
                sx={{
                  mx: "1rem",
                  minWidth: 100,
                }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
