/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Container,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

// Icons
import PrintIcon from "@mui/icons-material/Print";
import dayjs from "dayjs";
import { getSession } from "../../auth/auth";
import axios from "axios";

function Receipt() {
  const navigate = useNavigate();
  const { transactionid } = useParams();
  const [transaction, setTransaction] = useState<any>("");
  const [isBusy, setBusy] = useState(true);

  const queryTransaction = async () => {
    try {
      getSession()
        .then((result: any) => {
          // Get transaction by ID
          return axios(
            import.meta.env.VITE_APP_BACKEND_URL +
              "/transactions/" +
              transactionid,
            {
              headers: {
                Authorization: `${result.accessToken.jwtToken}`,
              },
            }
          );
        })
        .then((result: any) => {
          console.log(result);
          // Set state to transaction
          setTransaction(result.data);
          setBusy(false);
        });
    } catch (e) {
      navigate("/404");
    }
  };

  useEffect(() => {
    queryTransaction();
  }, []);

  return (
    <>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : transaction && transaction.status == "Paid" ? (
        <>
          <Paper sx={{ maxWidth: 600, padding: 3, mt: 3 }}>
            <Typography>Burnaby Tennis Club</Typography>
            <Typography variant="h2">Receipt</Typography>
            <Stack spacing={0}>
              <Typography margin={0}>
                Transaction ID: {transactionid}
              </Typography>
              <Typography margin={0}>
                Date Paid:{" "}
                {dayjs(transaction.paidDatetime).format("MMMM D, YYYY")}
              </Typography>
              <Typography margin={0}>Status: {transaction.status}</Typography>
              <Typography margin={0}>
                Payment Type: {transaction.paymentMethod.name}
              </Typography>
              <Typography margin={0}>Payer: {transaction.clubUser}</Typography>
            </Stack>
            <Typography sx={{ fontWeight: "bold" }}>
              {transaction.title}
            </Typography>
            <Typography>{transaction.shortDescription}</Typography>
            <Stack spacing={4} direction="row" justifyContent="flex-end">
              <Box>
                <Typography align="right">Subtotal</Typography>
                <Typography align="right">Tax</Typography>
                <Typography align="right">Total</Typography>
              </Box>
              <Box>
                <Typography align="right">
                  ${transaction.subtotal.toFixed(2)}
                </Typography>
                <Typography align="right">
                  ${(transaction.gstAmount + transaction.pstAmount).toFixed(2)}
                </Typography>
                <Typography align="right">
                  ${transaction.total.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontWeight: "bold" }}>
              Total Payment: ${transaction.total.toFixed(2)}
            </Typography>
            <Divider sx={{ margin: 2 }} />
            <Stack spacing={0}>
              <Typography margin={0}>Burnaby Tennis Club</Typography>
              <Typography margin={0}>604-291-0916</Typography>
              <Typography margin={0}>info@burnabytennis.ca</Typography>
              <Typography margin={0}>3890 Kensington Ave</Typography>
              <Typography margin={0}>Burnaby, BC</Typography>
              <Typography margin={0}>V5B 4V8</Typography>
            </Stack>
          </Paper>
          <Button
            disabled
            sx={{ my: 2 }}
            color="secondary"
            startIcon={<PrintIcon />}
          >
            Print receipt
          </Button>
        </>
      ) : (
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Box textAlign="center" mt={10}>
            <Typography>Oops! Something went wrong</Typography>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Receipt;
