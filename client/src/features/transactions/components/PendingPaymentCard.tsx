import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

function PendingPaymentCard(props: {
  total: number;
  subtotal: number;
  tax: number;
  title: string;
  description: string;
  date: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 450, mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent sx={{ width: "50%" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography width={70} sx={{ fontWeight: "bold" }}>
                ${props.total.toFixed(2)}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {props.title}
                </Typography>
                <Typography variant="body2">{props.description}</Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions>
            <Button onClick={handleClickOpen} color="secondary">
              Details
            </Button>
            <Button component={Link} to={`${props.id}`} variant="contained">
              Pay now
            </Button>
          </CardActions>
        </Stack>
      </Card>

      {/* Details Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} my={2}>
            <Stack>
              <DialogContentText minWidth="120px" margin={0}>
                <strong>Transaction ID:</strong>
              </DialogContentText>
              <DialogContentText margin={0}>
                <strong>Due Date:</strong>
              </DialogContentText>
              <DialogContentText margin={0}>
                <strong>Title:</strong>
              </DialogContentText>
              <DialogContentText margin={0}>
                <strong>Description:</strong>
              </DialogContentText>
            </Stack>
            <Stack alignItems="start">
              <DialogContentText margin={0}>{props.id}</DialogContentText>
              <DialogContentText margin={0}>
                {dayjs(props.date).format("MMMM DD, YYYY")}
              </DialogContentText>
              <DialogContentText margin={0}>{props.title}</DialogContentText>
              <DialogContentText margin={0} align="left" maxWidth="300px">
                {props.description}
              </DialogContentText>
            </Stack>
          </Stack>
          <Divider variant="middle" />
          <Stack spacing={2} direction="row" mt={2}>
            <Stack>
              <DialogContentText minWidth="120px" margin={0}>
                <strong>Subtotal:</strong>
              </DialogContentText>
              <DialogContentText margin={0}>
                <strong>Tax:</strong>
              </DialogContentText>
              <DialogContentText margin={0}>
                <strong>Total:</strong>
              </DialogContentText>
            </Stack>
            <Stack alignItems="end">
              <DialogContentText margin={0}>
                ${props.subtotal.toFixed(2)}
              </DialogContentText>
              <DialogContentText margin={0}>
                ${props.tax.toFixed(2)}
              </DialogContentText>
              <DialogContentText margin={0}>
                ${props.total.toFixed(2)}
              </DialogContentText>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PendingPaymentCard;
