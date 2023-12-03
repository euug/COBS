/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, Container, Typography } from "@mui/material";

// Navigation
import PublicDrawer from "../../layouts/components/PublicDrawer";
import PublicNavBottom from "../../layouts/components/PublicNavBottom";

import PendingPaymentsList from "../../features/transactions/components/PendingPaymentsList";
import PastPaymentsList from "../../features/transactions/components/PastPaymentsList";
import { useEffect, useState } from "react";
import { getSession } from "../../features/auth/auth";
import axios from "axios";

function PublicPayments() {
  const [isBusy, setBusy] = useState(true);
  const [payments, setPayments] = useState<any>([]);

  const listTransaction = async () => {
    setBusy(true);
    try {
      // Find current user's payments
      await getSession()
        .then((result: any) => {
          return axios(import.meta.env.VITE_APP_BACKEND_URL + "/transactions", {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
          });
        })
        .then((result: any) => {
          // Set state to payments

          console.log(result.data);
          setPayments(
            result.data.map((t: any) => {
              return {
                title: t.title,
                shortDescription: t.shortDescription,
                id: t.id,
                paidDatetime: t.paidDatetime,
                total: t.total,
                status: t.status,
              };
            })
          );

          console.log(payments);
        });
    } catch (e) {
      console.log(e);
    }
    setBusy(false);
  };

  useEffect(() => {
    listTransaction();
  }, []);

  return isBusy ? (
    <Box textAlign="center" mt={10}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <PublicDrawer page="Payments" />
      <PublicNavBottom page="Payments" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Payments</Typography>
          <PendingPaymentsList />
          <Typography variant="h3">Past Payments</Typography>
          <PastPaymentsList />
        </Container>
      </Box>
    </Box>
  );
}

export default PublicPayments;
