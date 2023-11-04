import { Box, Typography, Container } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import Checkout from "../../features/transactions/components/Checkout";

function PublicCheckout() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Payments" />
      <PublicNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">Checkout</Typography>
          <Checkout />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicCheckout;
