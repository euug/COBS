import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

// Icons
import PaymentIcon from "@mui/icons-material/Payment";

interface FeeProps {
  feeTitle: string;
  feeDescription: string;
  feeAmount: number;
  feeID: string;
}

function BookingCard(props: FeeProps) {
  return (
    <Card variant="outlined" sx={{ minWidth: 400, my: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CardContent sx={{ width: "60%" }}>
          <Typography gutterBottom sx={{ fontWeight: "bold" }}>
            {props.feeTitle}
          </Typography>
          <Typography variant="body2">{props.feeDescription}</Typography>
        </CardContent>
        <CardActions>
          <Stack alignItems="center">
            <Typography variant="body1" fontWeight={600}>
              ${props.feeAmount.toFixed(2)}
            </Typography>
            {/* TODO: add route variable to access receipt */}
            <Button
              component={Link}
              to="#"
              startIcon={<PaymentIcon />}
              variant="contained"
            >
              Pay Now
            </Button>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}

export default BookingCard;
