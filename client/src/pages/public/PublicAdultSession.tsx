import { Box, Container } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import AdultSessionRegistration from "../../features/programs/components/AdultSessionRegistration";

function PublicAdultSession() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Programs" />
      <PublicNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <AdultSessionRegistration />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicAdultSession;
