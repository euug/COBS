/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const borderColor: string = "#DCDCDC";

dayjs.extend(utc);

interface BookingProps {
  bookingID: string;
  bookingColor: string;
  bookingDatetime: string;
  bookingDuration: number;
  players: any[];
}

function BookingCard(props: BookingProps) {
  function getBookingTimeRange(datetime: string, duration: number) {
    const startTime = dayjs.utc(datetime).format("h:mmA");
    const endTime = dayjs.utc(datetime).add(duration, "minute").format("h:mmA");

    return `${startTime} - ${endTime}`;
  }

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 400, my: 2, position: "relative" }}
    >
      <Box
        width="100px"
        height="20px"
        sx={{
          position: "absolute",
          backgroundColor: props.bookingColor,
          borderWidth: "0px 1px 1px 0px",
          borderStyle: "solid",
          borderColor: borderColor,
        }}
      />
      <Stack direction="row" justifyContent="space-between">
        <CardContent sx={{ width: "70%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: "bold" }}>
              {dayjs(props.bookingDatetime).format("ddd MMM D")}
              <br />
              {getBookingTimeRange(
                props.bookingDatetime,
                props.bookingDuration
              )}
            </Typography>
            <Stack direction="column">
              {props.players.map((p) => (
                <Typography key={p.id} variant="body2">
                  {`${p.firstName} ${p.lastName}`}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          {/* TODO: Add Booking Edit Modals */}
          <IconButton color="primary" aria-label="edit booking">
            <EditIcon />
          </IconButton>
          {/* TODO: Delete booking with BookingID */}
          <IconButton color="error" aria-label="delete booking">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
}

export default BookingCard;
