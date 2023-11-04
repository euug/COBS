import { Typography, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

function RegistrationLayout() {
  return (
    <Container>
      <Toolbar />
      <Typography variant="h1">Register Account</Typography>
      <Outlet />
    </Container>
  );
}

export default RegistrationLayout;
