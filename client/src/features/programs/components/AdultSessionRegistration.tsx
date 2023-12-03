/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  AlertColor,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getSession } from "../../auth/auth";

const calculateGst = (total: number, isgst: boolean, gst: number) => {
  let taxPercentTotal = 0.0;

  if (isgst) taxPercentTotal += gst;

  return (total * taxPercentTotal) / (1 + taxPercentTotal);
};

const calculatePst = (total: number, ispst: boolean, pst: number) => {
  let taxPercentTotal = 0.0;

  if (ispst) taxPercentTotal += pst;

  return (total * taxPercentTotal) / (1 + taxPercentTotal);
};

function AdultSessionRegistration() {
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const [session, setSession] = useState<any>({});
  const [tax, setTax] = useState<any>([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [isBusy2, setBusy2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const handleAddClinicTransaction = async () => {
    try {
      setLoading(true);
      // If user already exists in the usertransactions, then don't create new one
      if (registeredSessions.filter((rs) => rs == sessionid).length < 1) {
        // Create a new transaction
        getSession()
          .then((result: any) => {
            console.log(result.accessToken);
            return axios.post(
              import.meta.env.VITE_APP_BACKEND_URL + "/transactions/program",
              {
                sessionId: sessionid,
              },
              {
                headers: {
                  Authorization: `${result.accessToken.jwtToken}`,
                },
              }
            );
          })
          .then((response: any) => {
            console.log(response);
            navigate(`/pub/payments/${response.data.id}`);
          })
          .catch((e) => {
            setSeverity("error");
            setErrorMessage("Error: " + e.message);
            setAlertOpen(true);
          });

        // Create program session for a user
        // Navigate to payment page
      } else {
        setSeverity("error");
        setErrorMessage("User has already added program");
        setAlertOpen(true);
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const querySession = async () => {
    try {
      setBusy(true);
      // Query session by id
      axios(
        import.meta.env.VITE_APP_BACKEND_URL + "/programs/adult/" + sessionid
      ).then((response) => {
        console.log(response);
        setSession(response.data);

        // Get tax amount
        axios(
          import.meta.env.VITE_APP_BACKEND_URL +
            "/transactions/transaction-settings/tax"
        ).then((response) => {
          console.log(response.data);
          setTax(response.data);
          setBusy(false);
        });
      });

      console.log(session);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegisteredSessions = async () => {
    try {
      setBusy2(true);
      getSession()
        .then((result: any) => {
          return axios(
            import.meta.env.VITE_APP_BACKEND_URL + "/clubuser/registered",
            {
              headers: {
                Authorization: `${result.accessToken.jwtToken}`,
              },
            }
          );
        })
        .then((result) => {
          console.log(result);
          setRegisteredSessions(
            result.data.transactions.filter((t: any) => t.session)
          );
          setBusy2(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    querySession();
    getRegisteredSessions();
  }, []);

  return (
    <>
      {isBusy || isBusy2 ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : session.isActive ? (
        <>
          <Typography variant="h1_home">{session.program.name}</Typography>
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
          <Typography variant="subtitle1" color="secondary.dark">
            {session.name}
          </Typography>
          <Typography maxWidth={900}>{session.program.description}</Typography>
          <Stack direction="row" flexWrap="wrap">
            <Box minWidth={300} marginRight={8} marginBottom={4}>
              <Typography variant="h4" color="success.dark">
                Clinic dates ({session.sessionDates.length} days)
              </Typography>
              {session.sessionDates.map((date: string) => {
                return (
                  <Typography key={date} textAlign="start">
                    {dayjs(date).format("MMM D YYYY dddd h:mmA")}
                  </Typography>
                );
              })}
            </Box>
            <Box minWidth={180} marginRight={8} marginBottom={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Coach:
                </Typography>
                <Typography align="right">
                  {session.coach.firstName} {session.coach.lastName}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Ages:
                </Typography>
                <Typography align="right">{`${session.program.minAge}${
                  session.program.maxAge == 999
                    ? "+"
                    : " - " + session.program.maxAge
                }`}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Spots left:
                </Typography>
                <Typography align="right">
                  {session.transactions
                    ? session.maxSpots -
                      session.transactions.filter(
                        (t: any) => t.status == "Paid"
                      ).length
                    : session.maxSpots}
                </Typography>
              </Stack>
            </Box>
            <Box minWidth={180} marginRight={8} marginBottom={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Fee:
                </Typography>
                <Typography align="right">
                  $
                  {(
                    session.regularPrice -
                    calculateGst(
                      session.regularPrice,
                      session.isGst,
                      parseFloat(tax[0].value)
                    ) -
                    calculatePst(
                      session.regularPrice,
                      session.isPst,
                      parseFloat(tax[1].value)
                    )
                  ).toFixed(2)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Tax:
                </Typography>
                <Typography align="right">
                  $
                  {(
                    calculateGst(
                      session.regularPrice,
                      session.isGst,
                      parseFloat(tax[0].value)
                    ) +
                    calculatePst(
                      session.regularPrice,
                      session.isPst,
                      parseFloat(tax[1].value)
                    )
                  ).toFixed(2)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="success.dark" marginTop={0}>
                  Total:
                </Typography>
                <Typography align="right">${session.regularPrice}</Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button onClick={() => navigate(-1)}>Back</Button>
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleAddClinicTransaction}
              disabled={
                !(
                  session.maxSpots >
                  registeredSessions.filter(
                    (ut: any) => ut.sessionId == sessionid
                  ).length
                )
                  ? true
                  : !session.transactions
                  ? false
                  : registeredSessions.filter(
                      (ut: any) => ut.sessionId == sessionid
                    ).length
                  ? true
                  : false
              }
            >
              {session.maxSpots >
              session.transactions.filter((ut: any) => ut.status == "Paid")
                .length
                ? "Pay now"
                : "Session full"}
            </LoadingButton>
            {registeredSessions.filter((ut: any) => ut.sessionId == sessionid)
              .length ? (
              <Typography color="red">
                You have already added this class
              </Typography>
            ) : null}
          </Stack>
        </>
      ) : (
        <Container maxWidth="xl" sx={{ mb: 20 }}>
          <Box textAlign="center" mt={10}>
            <Typography>Oops! Session is not active</Typography>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Box>
        </Container>
      )}
    </>
  );
}

export default AdultSessionRegistration;
