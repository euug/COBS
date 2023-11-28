/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Fab,
  Paper,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

// Custom Components
import PublicBookingCard from "../../features/bookings/components/PublicBookingCard";
import PendingFeeCard from "../../features/transactions/components/PendingFeeCard";

import { getSession } from "../../features/auth/auth";

// Icons
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const paperBackgroundColor: string = "#E7E9E2";

function PublicDashboard() {
  const navigate = useNavigate();

  const [pendingFees, setPendingFees] = useState<any[]>([]);
  const [clubCredit, setClubCredit] = useState<number>(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isBusy, setBusy] = useState(true);
  const [isResetLoading, setResetLoading] = useState(false);

  const handleReset = async () => {
    setResetLoading(true);

    const resetRes = await axios.delete("http://localhost:3000/reset");

    console.log(resetRes);

    setResetLoading(false);
    navigate(0);
  };

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
          return axios("http://localhost:3000/clubuser/my-dashboard", {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
          });
        })
        .then((result) => {
          console.log(result);
          setClubCredit(result.data.clubCredit);
          setPendingFees(
            result.data.transactions.filter((t: any) => t.status == "Pending")
          );
          setBookings(
            result.data.bookings.filter((booking: any) => {
              const bookingTime = dayjs.utc(booking.datetime);

              return bookingTime.isAfter(currentDate);
            })
          );
          console.log(bookings);
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
      <PublicDrawer page="Dashboard" />
      <PublicNavBottom page="Dashboard" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Typography variant="h1_home">My Dashboard</Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="flex-start"
            spacing={3}
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
              {bookings.length ? (
                bookings.map((booking) => (
                  <PublicBookingCard
                    key={booking.id}
                    bookingID={booking.id}
                    courtNumber={booking.court.name}
                    bookingColor={booking.bookingType.color}
                    bookingDatetime={booking.datetime}
                    bookingDuration={booking.duration}
                    players={booking.players}
                  />
                ))
              ) : (
                <Stack py={2}>
                  <Typography variant="h4" color="gray">
                    You don't have upcoming bookings
                  </Typography>
                </Stack>
              )}
            </Paper>
            <Stack spacing={3} width={{ xs: "100%", md: "50%" }}>
              <Paper
                elevation={4}
                sx={{
                  padding: 2,
                  minWidth: 300,
                  backgroundColor: paperBackgroundColor,
                }}
              >
                <Typography variant="h3" marginBottom={3}>
                  My Pending Fees
                </Typography>
                {pendingFees.length ? (
                  pendingFees
                    .sort((a, b) =>
                      a.createddatetime < b.createddatetime ? 1 : -1
                    )
                    .filter((element, index) => {
                      console.log(element);
                      return index < 3;
                    })
                    .map((fee) => (
                      <PendingFeeCard
                        key={fee.id}
                        feeAmount={fee.total}
                        feeDescription={fee.shortdescription}
                        feeID={fee.id}
                        feeTitle={fee.title}
                      />
                    ))
                ) : (
                  <Stack py={2}>
                    <Typography variant="h4" color="gray">
                      You don't owe anything
                    </Typography>
                  </Stack>
                )}
                <Box display="flex" justifyContent="center">
                  {pendingFees.length > 3 ? (
                    <Button variant="text">See more</Button>
                  ) : null}
                </Box>
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  padding: 2,
                  backgroundColor: paperBackgroundColor,
                }}
              >
                <Typography variant="h3">My Club Credit</Typography>
                <Stack
                  spacing={5}
                  alignItems="center"
                  direction="row"
                  justifyContent="left"
                  my={2}
                >
                  <Paper elevation={1} sx={{ width: "50%", px: 2 }}>
                    <Typography
                      textAlign="right"
                      sx={{ fontWeight: "bold", fontSize: 32 }}
                    >
                      ${clubCredit.toFixed(2)}
                    </Typography>
                  </Paper>
                  <Fab
                    component={Link}
                    to="clubcredit/purchase"
                    color="secondary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
          <Stack display="flex" alignItems="center">
            <Typography>Testing purposes only</Typography>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                variant="contained"
                disabled={isResetLoading}
                onClick={handleReset}
              >
                Reset all bookings and clinics
              </Button>
              {isResetLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default PublicDashboard;
