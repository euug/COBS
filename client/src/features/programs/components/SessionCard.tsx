/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface clinic {
  dayOfWeek: string;
  name: string;
  session: number;
  price: number;
  spots: number;
  minAge: number;
  maxAge: number;
  weeks: number;
  id: string;
  registered: boolean;
  startDate: string;
  endDate: string;
}

function SessionCard(props: clinic) {
  const [openList, setOpenList] = useState(false);

  const handleWaitlist = () => {
    setOpenList(true);
  };

  const handleCloseList = () => {
    setOpenList(false);
  };

  return (
    <>
      {/* Join Waitlist Dialog TODO */}
      <Dialog open={openList} onClose={handleCloseList}>
        <DialogTitle>Clinic Waitlist</DialogTitle>
        <DialogContent>
          <Typography>Current number of people on waitlist:</Typography>
          <Typography variant="h3" align="center">
            2
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseList}>Close</Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCloseList}
          >
            Join waitlist
          </Button>
        </DialogActions>
      </Dialog>

      {/* Card */}
      <Card sx={{ minWidth: 450, maxWidth: 800, my: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent>
            <Typography variant="h4">{props.name}</Typography>
            <Typography variant="subtitle2">{props.session}</Typography>
            <Stack direction="row" spacing={8} mt={1}>
              <Box>
                <Typography variant="body2">
                  <strong>Day of week</strong>: {props.dayOfWeek}
                </Typography>
                <Typography variant="body2">
                  <strong>Time</strong>:{" "}
                  {dayjs.utc(props.startDate).format("h:mma")} -{" "}
                  {dayjs.utc(props.endDate).format("h:mma")}
                </Typography>
                <Typography variant="body2">
                  <strong>Number of sessions</strong>: {props.weeks}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  <strong>Ages</strong>:{" "}
                  {`${props.minAge}${
                    props.maxAge == 999 ? "+" : " - " + props.maxAge
                  }`}
                </Typography>
                <Typography variant="body2">
                  <strong>Price</strong>: ${props.price.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack spacing={1}>
              <Chip
                variant="outlined"
                color={props.spots ? "primary" : "warning"}
                icon={<PeopleIcon />}
                label={props.spots.toString().concat(" spots left")}
                sx={{ padding: 1 }}
              />
              {props.spots ? (
                <Button
                  component={Link}
                  to={props.id}
                  variant="contained"
                  disabled={props.registered}
                >
                  {props.registered ? "Added" : "Register"}
                </Button>
              ) : (
                <Button
                  onClick={handleWaitlist}
                  variant="contained"
                  color="warning"
                >
                  Waitlist
                </Button>
              )}
            </Stack>
          </CardActions>
        </Stack>
      </Card>
    </>
  );
}

export default SessionCard;
