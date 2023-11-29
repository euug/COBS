import { Box, Typography, Container } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import Receipt from "../../features/transactions/components/Receipt";

function MemberReceipt() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Payments" />
      <MemberNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">Receipt</Typography>
          <Receipt />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberReceipt;
