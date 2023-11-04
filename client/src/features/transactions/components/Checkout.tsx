/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";

// Icons
import PaymentIcon from "@mui/icons-material/Payment";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getSession } from "../../auth/auth";

function Checkout() {
  const navigate = useNavigate();
  const { transactionid } = useParams();
  const [transaction, setTransaction] = useState<any>();
  const [isBusy, setBusy] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const handlePayment = async (paymentMethod: string) => {
    try {
      setLoading(true);

      if (transaction.status == "Pending") {
        getSession()
          .then((result: any) => {
            // Get transaction by ID
            return axios.put(
              `http://localhost:3000/transactions/${transactionid}/pay`,
              {
                paymentMethod: paymentMethod,
              },
              {
                headers: {
                  Authorization: `${result.accessToken.jwtToken}`,
                },
              }
            );
          })
          .then((result: any) => {
            console.log(result);
            setLoading(false);
            navigate(`/pub/receipt/${transactionid}`);
          });
      } else {
        setSeverity("error");
        setErrorMessage("Not a pending transaction");
        setAlertOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const queryTransaction = async () => {
    setBusy(true);
    try {
      getSession()
        .then((result: any) => {
          // Get transaction by ID
          return axios("http://localhost:3000/transactions/" + transactionid, {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
          });
        })
        .then((result: any) => {
          console.log(result);
          // Set state to transaction
          setTransaction(result.data);
          setBusy(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    queryTransaction();
  }, []);

  return (
    <Box>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Collapse in={alertOpen}>
            <Alert
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
          <Paper sx={{ maxWidth: 600, padding: 3, mt: 3 }}>
            <Typography>Transaction ID: {transactionid}</Typography>
            <Typography variant="h4">{transaction.title}</Typography>
            <Typography variant="caption">
              {dayjs(transaction.createdAt).format("MMMM D, YYYY")}
            </Typography>
            <Typography>{transaction.description}</Typography>
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
          </Paper>
          <Paper sx={{ maxWidth: 600, padding: 3, mt: 3 }}>
            <Typography align="center" variant="h4" marginBottom={2}>
              {transaction.status == "Pending" ? "Pay with" : "Already paid"}
            </Typography>
            {transaction.status == "Pending" ? (
              <Stack spacing={2}>
                <LoadingButton
                  startIcon={<CurrencyRubleIcon />}
                  variant="contained"
                  loading={loading}
                  loadingPosition="start"
                  fullWidth
                  color="success"
                  onClick={() => handlePayment("PayPal")}
                >
                  PayPal
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="info"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<PaymentIcon />}
                  fullWidth
                  onClick={() => handlePayment("Credit Card")}
                >
                  Debit or Credit Card
                </LoadingButton>
              </Stack>
            ) : null}
          </Paper>
        </>
      )}
    </Box>
  );
}

export default Checkout;
