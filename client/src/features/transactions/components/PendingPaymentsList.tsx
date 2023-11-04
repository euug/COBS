/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";

import PendingPaymentCard from "./PendingPaymentCard";
import axios from "axios";
import { getSession } from "../../auth/auth";

function PendingPaymentsList() {
  const [payments, setPayments] = useState<any>([]);
  const [isBusy, setBusy] = useState(true);

  const listTransaction = async () => {
    setBusy(true);
    try {
      // Find current user's payments
      await getSession()
        .then((result: any) => {
          return axios("http://localhost:3000/transactions", {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
          });
        })
        .then((result: any) => {
          console.log(result);
          // Set state to payments
          setPayments(result.data.filter((t: any) => t.status == "Pending"));
        });
    } catch (e) {
      console.log(e);
    }
    setBusy(false);
  };

  useEffect(() => {
    listTransaction();
  }, []);

  return (
    <>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : payments.length ? (
        <>
          <Typography variant="h3">Pending</Typography>
          <Stack spacing={1}>
            {payments
              .filter((payment: any) => {
                console.log(payment);
                return payment.status == "Pending";
              })
              .map((p: any) => {
                return (
                  <PendingPaymentCard
                    total={p.total}
                    subtotal={p.subtotal}
                    tax={p.gstAmount + p.pstAmount}
                    title={p.title}
                    description={p.shortDescription}
                    date={p.dueDatetime}
                    id={p.id}
                  />
                );
              })}
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h3">Pending Payments</Typography>
          <Card sx={{ minWidth: 450, mt: 2 }}>
            <Stack p={2}>
              <Typography color="GrayText">No Pending Payments</Typography>
            </Stack>
          </Card>
        </>
      )}
    </>
  );
}

export default PendingPaymentsList;
