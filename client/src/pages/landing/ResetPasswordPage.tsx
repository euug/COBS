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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { confirmPassword } from "../../features/auth/auth";

function ForgotPassword() {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertOpen(false);
    setAlertMsg("");

    try {
      await confirmPassword(email, code, newPassword);
      setSeverity("success");
      setAlertMsg("Password reset successful");
      setAlertOpen(true);
      navigate("/login");
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
            Reset Password
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                required
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                required
                name="code"
                label="Confirmation code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <TextField
                fullWidth
                required
                name="new-password"
                label="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Paper elevation={2} sx={{ backgroundColor: "#F1F2ED" }}>
                <Box p={1}>
                  <List dense disablePadding>
                    <ListItem>
                      {newPassword.length < 8 ? (
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
                      {newPassword.toUpperCase() == newPassword ? (
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
                      {newPassword.toLowerCase() == newPassword ? (
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
                      {/\d/.test(newPassword) ? (
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
            <Box display="flex" justifyContent="center" marginY="1rem">
              <Button
                type="submit"
                sx={{
                  mx: "1rem",
                }}
                variant="contained"
              >
                Reset password
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default ForgotPassword;
