import { Box, Container } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import AdultSessionRegistration from "../../features/programs/components/AdultSessionRegistration";

function MemberAdultSession() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Programs" />
      <MemberNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <AdultSessionRegistration />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberAdultSession;
