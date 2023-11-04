import { Box, Typography, Container, Stack } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import DatetimeLive from "../../layouts/components/DatetimeLive";

// dayjs
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import PublicBookingGrid from "../../features/bookings/components/PublicBookingGrid";

//Icons

dayjs.extend(isBetween);

function PublicBookCourt() {
  return (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="My Bookings" />
      <PublicNavBottom page="Bookings" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Book a Court</Typography>
          <Stack
            direction="row"
            alignItems="center"
            flexDirection="row"
            spacing={8}
            mt={3}
          >
            <DatetimeLive />
          </Stack>
          <PublicBookingGrid />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicBookCourt;
