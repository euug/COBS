/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import PublicBookingCard from "../../features/bookings/components/PublicBookingCard";

// Icons
import BookOnlineIcon from "@mui/icons-material/BookOnline";

import { getSession } from "../../features/auth/auth";
import axios from "axios";
import dayjs from "dayjs";

const paperBackgroundColor: string = "#E7E9E2";

function PublicBookings() {
  const [bookings, setBookings] = useState<any[]>();
  const [isBusy, setBusy] = useState(true);

  const queryDashboard = async () => {
    setBusy(true);

    // Set datetime without timezone
    const normalizedDateString = dayjs()
      .tz("Canada/Pacific") // Set timezone to club's physical location
      .format("YYYY-MM-DDTHH:MM:ss+00:00");
    const currentDate = dayjs(normalizedDateString).utc();

    try {
      getSession()
        .then((result: any) => {
          return axios(
            import.meta.env.VITE_APP_BACKEND_URL + "/clubuser/my-dashboard",
            {
              headers: {
                Authorization: `${result.accessToken.jwtToken}`,
              },
            }
          );
        })
        .then((result) => {
          setBookings(
            result.data.bookings.filter((booking: any) => {
              const bookingTime = dayjs.utc(booking.datetime);

              return bookingTime.isAfter(currentDate);
            })
          );
          setBusy(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    queryDashboard();
  }, []);

  return isBusy ? (
    <Box textAlign="center" mt={10}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="My Bookings" />
      <PublicNavBottom page="Bookings" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">Court Bookings</Typography>
          <Box mt={3}>
            <Fab component={Link} to="book" variant="extended" color="success">
              <BookOnlineIcon sx={{ mr: 1 }} />
              View Booking Grid
            </Fab>
          </Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="flex-start"
            spacing={4}
            sx={{ my: 4 }}
          >
            <Paper
              elevation={4}
              sx={{
                width: { xs: "100%", md: "50%" },
                padding: 2,
                minWidth: 450,
                backgroundColor: paperBackgroundColor,
              }}
            >
              <Typography variant="h3" marginBottom={3}>
                Upcoming Bookings
              </Typography>
              {bookings?.length ? (
                bookings.map((booking) => (
                  <PublicBookingCard
                    bookingID={booking.id}
                    bookingColor={booking.bookingType.color}
                    bookingDatetime={booking.datetime}
                    bookingDuration={booking.duration}
                    courtNumber={booking.court.name}
                    players={booking.players}
                  />
                ))
              ) : (
                <Typography>No Bookings</Typography>
              )}
            </Paper>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default PublicBookings;
