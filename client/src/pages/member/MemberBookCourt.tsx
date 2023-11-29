import { Box, Typography, Container, Stack } from "@mui/material";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

import DatetimeLive from "../../layouts/components/DatetimeLive";

// dayjs
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import MemberBookingGrid from "../../features/bookings/components/MemberBookingGrid";

//Icons

dayjs.extend(isBetween);

function MemberBookCourt() {
  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="My Bookings" />
      <MemberNavBottom page="Bookings" />
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
          <MemberBookingGrid />
        </Container>
      </Box>
    </Box>
  );
}

export default MemberBookCourt;
