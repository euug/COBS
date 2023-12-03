import { Box, Container } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import JuniorSessionRegistration from "../../features/programs/components/JuniorSessionRegistration";

function MemberJuniorSession() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Programs" />
      <MemberNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <JuniorSessionRegistration />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberJuniorSession;
