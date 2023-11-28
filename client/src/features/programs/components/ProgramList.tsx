/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import SessionCard from "./SessionCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSession } from "../../auth/auth";

function ProgramList() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<any[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [registeredSessions, setRegisteredSessions] = useState<any>();
  const [isBusy, setBusy] = useState(true);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const queryPrograms = async () => {
    try {
      await getSession()
        .then((result: any) => {
          return axios("http://localhost:3000/clubuser/registered", {
            headers: {
              Authorization: `${result.accessToken.jwtToken}`,
            },
          });
        })
        .then((result) => {
          console.log(result);
          setRegisteredSessions(
            result.data.transactions.filter((t: any) => t.sessionId != null)
          );
          console.log(registeredSessions);
        });
      // Get all program types
      axios("http://localhost:3000/programs/adult").then((response) => {
        console.log(response.data);
        setPrograms(response.data);
        setBusy(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    queryPrograms();
  }, []);

  return (
    <>
      {isBusy ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : programs.length ? (
        <>
          <Box mt={3}>
            <Tabs value={tabValue} variant="scrollable" onChange={handleChange}>
              <Tab label="All programs" />
              {programs
                ? programs
                    .sort((a, b) => {
                      return a.sortorder > b.sortorder ? 1 : -1;
                    })
                    .map((clinic, i) => {
                      return <Tab key={i} label={clinic.name} />;
                    })
                : ""}
            </Tabs>
          </Box>
          {tabValue
            ? programs
                .filter((_clinic, index) => {
                  return index + 1 === tabValue;
                })
                .map((clinic, i) => {
                  return clinic.session.map((session: any) => {
                    return (
                      <SessionCard
                        key={i + clinic.id}
                        name={clinic.name}
                        session={session.name}
                        price={session.regularPrice}
                        spots={
                          session.maxSpots -
                          session.transactions.filter(
                            (t: any) => t.status == "Paid"
                          ).length
                        }
                        minAge={clinic.minAge}
                        maxAge={clinic.maxAge}
                        dayOfWeek={session.dayOfWeek[0]}
                        weeks={session.totalWeeks || ""}
                        id={session.id}
                        registered={
                          registeredSessions.filter(
                            (rs: any) => rs.session.id == session.id
                          ).length
                            ? true
                            : false
                        }
                        startDate={session.startDatetime}
                        endDate={session.endDatetime}
                      />
                    );
                  });
                })
            : programs.map((program, i) => {
                return program.session.map((session: any) => {
                  return (
                    <SessionCard
                      key={i + program.id}
                      name={program.name}
                      session={session.name}
                      price={session.regularPrice}
                      spots={
                        session.maxSpots -
                        session.transactions.filter(
                          (t: any) => t.status == "Paid"
                        ).length
                      }
                      minAge={program.minAge}
                      maxAge={program.maxAge}
                      dayOfWeek={session.dayOfWeek[0]}
                      weeks={session.totalWeeks || ""}
                      id={session.id}
                      registered={
                        registeredSessions.filter(
                          (rs: any) => rs.session.id == session.id
                        ).length
                          ? true
                          : false
                      }
                      startDate={session.startDatetime}
                      endDate={session.endDatetime}
                    />
                  );
                });
              })}
        </>
      ) : (
        <Box textAlign="center" mt={10}>
          <Typography>No programs</Typography>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </Box>
      )}
    </>
  );
}

export default ProgramList;
