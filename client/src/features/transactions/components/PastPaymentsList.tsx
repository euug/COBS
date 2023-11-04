/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import PaidPayment from "./PastPaymentCard";
import { getSession } from "../../auth/auth";
import axios from "axios";

function PastPaymentsList() {
  const [month, setMonth] = useState(dayjs(new Date()).format("MMMM"));
  const [isBusy, setBusy] = useState(true);
  const [payments, setPayments] = useState<any>([]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMonth: string
  ) => {
    console.log(event);
    setMonth(newMonth);
  };

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
          setPayments(result.data.filter((t: any) => t.status == "Paid"));
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

  return (
    <>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : payments.length ? (
        <>
          <ToggleButtonGroup
            color="primary"
            value={month}
            exclusive
            onChange={handleChange}
            aria-label="Month"
          >
            <ToggleButton value={dayjs(new Date()).format("MMMM")}>
              {dayjs(new Date()).format("MMMM")}
            </ToggleButton>
            <ToggleButton
              value={dayjs(new Date()).subtract(1, "month").format("MMMM")}
            >
              {dayjs(new Date()).subtract(1, "month").format("MMMM")}
            </ToggleButton>
            <ToggleButton
              value={dayjs(new Date()).subtract(2, "month").format("MMMM")}
            >
              {dayjs(new Date()).subtract(2, "month").format("MMMM")}
            </ToggleButton>
            <ToggleButton
              value={dayjs(new Date()).subtract(3, "month").format("MMMM")}
            >
              {dayjs(new Date()).subtract(3, "month").format("MMMM")}
            </ToggleButton>
            <ToggleButton value="Older">Older</ToggleButton>
          </ToggleButtonGroup>

          <Stack>
            {month === "Older"
              ? payments
                  .filter((payment: any) =>
                    dayjs(payment.paidDatetime).isAfter(
                      dayjs(new Date()).add(4, "month"),
                      "month"
                    )
                  )
                  .map((payment: any) => (
                    <PaidPayment
                      fee={payment.total}
                      title={payment.title}
                      description={payment.shortDescription}
                      date={payment.paidDatetime}
                      id={payment.id}
                    />
                  ))
              : payments
                  .filter(
                    (payment: any) =>
                      dayjs(payment.paidDatetime).format("MMMM") == month
                  )
                  .map((payment: any) => (
                    <PaidPayment
                      fee={payment.total}
                      title={payment.title}
                      description={payment.shortDescription}
                      date={payment.paidDatetime}
                      id={payment.id}
                    />
                  ))}
          </Stack>
        </>
      ) : (
        <Card sx={{ minWidth: 450, mt: 2 }}>
          <Stack p={2}>
            <Typography color="GrayText">No Past Payments</Typography>
          </Stack>
        </Card>
      )}
    </>
  );
}

export default PastPaymentsList;
