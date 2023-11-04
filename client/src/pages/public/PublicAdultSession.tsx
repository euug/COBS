import { Box, Container } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import SessionRegistration from "../../features/programs/components/SessionRegistration";

function PublicAdultSession() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Programs" />
      <PublicNavBottom page="Programs" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <SessionRegistration />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicAdultSession;
