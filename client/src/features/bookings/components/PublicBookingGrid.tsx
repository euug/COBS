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

//Icons

dayjs.extend(isBetween);

function PublicBookingGrid() {
  const [bookings, setBookings] = useState<any>({});
  const [isBusy, setBusy] = useState(true);
  const [day, setDay] = useState(0);
  const currentDate = dayjs(new Date()).startOf("day");
  const dayRange = [...Array(3).keys()];
  const increment = 30;
  const bookingHeight = 40;
  const bookingWidth = 200;

  const listCourts = async () => {
    setBusy(true);

    try {
      // Query bookings within date range
      await getSession()
        .then((result: any) => {
          return axios("http://localhost:3000/bookings", {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
            params: {
              offset: day,
            },
          });
        })
        .then((result: any) => {
          console.log(result);
          // Set state to payments
          setBookings(result.data);
          console.log(bookings);
        });
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.datetime + booking.court.id}
                    height={bookingHeight}
                    court={booking.court}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    bookableTime={booking.bookableTime}
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.datetime + booking.court.id}
                    court={booking.court}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    bookableTime={booking.bookableTime}
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.datetime + booking.court.id}
                    court={booking.court}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    bookableTime={booking.bookableTime}
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.datetime + booking.court.id}
                    court={booking.court}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    bookableTime={booking.bookableTime}
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
                    sx={{
                      borderRadius: 1,
                      backgroundColor: booking.color,
                      height:
                        (booking.duration / increment) * bookingHeight +
                        8 * (booking.duration / increment - 1),
                    }}
                  />
                ) : (
                  <AddBookingButton
                    key={booking.datetime + booking.court.id}
                    court={booking.court}
                    height={bookingHeight}
                    datetime={booking.datetime}
                    canBook={booking.canBook}
                    bookableTime={booking.bookableTime}
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
