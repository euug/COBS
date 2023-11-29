import { Box, Typography, Container } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import Checkout from "../../features/transactions/components/Checkout";

function MemberCheckout() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Payments" />
      <MemberNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">Checkout</Typography>
          <Checkout />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberCheckout;
