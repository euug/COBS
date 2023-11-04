import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

import { forgotPassword } from "../../features/auth/auth";

function ForgotPassword() {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const forgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertOpen(false);
    setAlertMsg("");

    try {
      await forgotPassword(email);
      navigate("/reset");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSeverity("error");
      setAlertMsg(err.message);
      setAlertOpen(true);
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
          <Typography align="center" variant="h1">
            Forgot Password?
          </Typography>
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
          <form onSubmit={forgotPasswordSubmit}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Box display="flex" justifyContent="center" marginY="1rem">
              <Button
                type="submit"
                sx={{
                  mx: "1rem",
                }}
                variant="contained"
              >
                Send confirmation email
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default ForgotPassword;
