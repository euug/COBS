import { Box, Typography, Container } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import ProgramList from "../../features/programs/components/ProgramList";

function MemberAdultClinics() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Programs" />
      <MemberNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Adult Clinics</Typography>
          <ProgramList />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberAdultClinics;
