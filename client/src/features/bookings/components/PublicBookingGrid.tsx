/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";

// dayjs
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import AddBookingButton from "./PublicAddBookingButton";

import { getSession } from "../../auth/auth";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

//Icons

dayjs.extend(isBetween);

function PublicBookingGrid() {
  const [bookings, setBookings] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<any>({});
  const [bookingRange, setBookingRange] = useState<any>();
  const [isBusy, setBusy] = useState(true);
  const [day, setDay] = useState(0);
  const currentDate = dayjs(new Date()).startOf("day");
  const dayRange = [...Array(3).keys()];
  const increment = 30;
  const bookingHeight = 40;
  const bookingWidth = 200;

  const listCourts = async () => {
    setBusy(true);

    // Normalize current date
    const normalizedDateString = dayjs()
      .tz("Canada/Pacific") // Set timezone to club's physical location
      .format("YYYY-MM-DDTHH:MM:ss+00:00");

    // const currentDate = dayjs(normalizedDateString).utc();

    try {
      const session: any = await getSession();

      // Query bookings within date range
      const bookings: any = await axios(
        import.meta.env.VITE_APP_BACKEND_URL + "/bookings",
        {
          headers: {
            Authorization: `${session.accessToken.jwtToken}`,
          },
          params: {
            offset: day,
          },
        }
      );

      setBookings(bookings.data);

      // Query business hours of current date
      const bookingRangeRes: any = await axios(
        import.meta.env.VITE_APP_BACKEND_URL + "/bookings/bookingRangeByDay",
        {
          params: {
            currentDate: normalizedDateString,
            offset: day,
          },
        }
      );

      setBookingRange(bookingRangeRes.data);
      console.log(bookingRange);

      // Query current user's data
      const currentUser = await axios(
        import.meta.env.VITE_APP_BACKEND_URL + "/clubuser/current-user",
        {
          headers: {
            Authorization: `${session.accessToken.jwtToken}`,
          },
        }
      );

      setCurrentUser(currentUser.data);
    } catch (e) {
      console.log(e);
    }

    setBusy(false);
  };

  useEffect(() => {
    listCourts();
  }, [day]);

  return (
    <>
      <Stack direction="row" spacing={2} mt={2}>
        {dayRange.map((d) => {
          return (
            <Chip
              key={d}
              label={currentDate.add(d, "day").format("ddd D[th]")}
              variant={d == day ? "filled" : "outlined"}
              color="secondary"
              sx={{ minWidth: 100 }}
              clickable
              onClick={async () => {
                setDay(d);
              }}
            />
          );
        })}
      </Stack>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={8} sx={{ px: 1, mt: 4 }}>
          <Stack direction="row" width="100%" justifyContent="space-around">
            <Stack
              justifyContent="flex-start"
              width="100%"
              minWidth={100}
              maxWidth={100}
              spacing={1}
              px={1}
              pt="40px"
            >
              {bookingRange.map((br: any) => {
                return (
                  <Box height={bookingHeight * 2 + 8}>
                    <Typography variant="body1">{br}</Typography>
                  </Box>
                );
              })}
            </Stack>
            <Stack
              justifyContent="center"
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 1</Typography>
              {bookings["Court 1"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 2</Typography>
              {bookings["Court 2"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 3</Typography>
              {bookings["Court 3"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 4</Typography>
              {bookings["Court 4"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 5</Typography>
              {bookings["Court 5"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              width="100%"
              minWidth={bookingWidth}
              spacing={1}
              px={1}
              py={2}
            >
              <Typography textAlign="center">Court 6</Typography>
              {bookings["Court 6"].map((booking: any) => {
                return booking.isBooked ? (
                  <Button
                    key={booking.id}
                    fullWidth
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                      "&:hover": { backgroundColor: booking.color },
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.id}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    court={booking.court}
                    bookableTime={booking.bookableTime}
                    userFullName={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  );
}

export default PublicBookingGrid;
