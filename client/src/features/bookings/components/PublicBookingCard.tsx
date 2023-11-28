/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const borderColor: string = "#DCDCDC";

dayjs.extend(utc);

interface BookingProps {
  bookingID: string;
  bookingColor: string;
  bookingDatetime: string;
  bookingDuration: number;
  courtNumber: string;
  players: any[];
}

function PublicBookingCard(props: BookingProps) {
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
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
            <Stack direction="column" justifyContent="center">
              {props.players.map((p) => (
                <Typography key={p.id} variant="body2">
                  {`${p.firstName} ${p.lastName}`}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </CardContent>
        <Box display="flex" justifyContent="center">
          <Typography sx={{ fontWeight: "bold" }} variant="body2">
            {props.courtNumber}
          </Typography>
        </Box>
        {/* <CardActions>
          <IconButton color="primary" aria-label="edit booking">
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete booking">
            <DeleteIcon />
          </IconButton>
        </CardActions> */}
      </Stack>
    </Card>
  );
}

export default PublicBookingCard;
