import { Box, Typography, Container } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import ProgramList from "../../features/programs/components/ProgramList";

function PublicJuniorClinics() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Programs" />
      <PublicNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Junior Clinics</Typography>
          <ProgramList />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicJuniorClinics;
