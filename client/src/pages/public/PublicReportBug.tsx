import { Box, Typography, Container } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import BugReportForm from "../../features/admin/components/BugReportForm";

function PublicReportBug() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Payments" />
      <PublicNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">Receipt</Typography>
          <BugReportForm />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicReportBug;
