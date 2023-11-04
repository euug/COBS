import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Toolbar,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  Skeleton,
} from "@mui/material";

// Components
import ProgramTypeCard from "../../features/programs/components/ProgramTypeCard";

// Images
import hero_logo from "../../assets/images/logobtc.png";
import hero_img from "../../assets/images/club_courts2.jpg";
import club_old_img from "../../assets/images/club_old.jpg";
import google_maps_img from "../../assets/images/google_maps_sample.png";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";

const cSurfaceVariant: string = "#DEE6DB";

interface Program {
  name: string;
  description: string;
  ageRange: string;
  image: string;
  link: string;
}

function LandingPage() {
  const [submit, setSubmit] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  const handleSubmit = () => {
    setSubmit(false);
  };

  useEffect(() => {
    let subscribed = true;
    setLoadingPrograms(true);
    axios("http://localhost:3000/programs/type").then((res) => {
      if (subscribed) {
        setPrograms(res.data);
        setLoadingPrograms(false);
      }
    });

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "space-between" },
            mt: 4,
            pb: 8,
            width: "100%",
          }}
        >
          <Box sx={{ maxWidth: 700 }}>
            <Typography variant="subtitle1">Welcome to</Typography>
            <Typography variant="display1">Burnaby Tennis Club</Typography>
            <Box sx={{ maxWidth: 380 }}>
              <Typography variant="body1">
                We are a non-profit society that functions in co-operation with
                the city of Burnaby. We have an extremely active club which
                makes it a great place to be a part of.
              </Typography>
              <Box>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  startIcon={<SearchIcon />}
                >
                  Browse Lessons
                </Button>
                <Button sx={{ my: 1 }} variant="outlined">
                  Book Courts
                </Button>
              </Box>
            </Box>
            <Box
              component="img"
              src={hero_logo}
              sx={{
                width: { xs: "100%", lg: "70%" },
                marginTop: "3rem",
              }}
            />
          </Box>
          <Box
            sx={{
              maxWidth: "50%",
              display: { xs: "none", lg: "block" },
            }}
          >
            <Box
              component="img"
              src={hero_img}
              sx={{
                width: "100%",
                borderRadius: "15px",
                boxShadow: 3,
                marginLeft: "1rem",
              }}
            />
          </Box>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: cSurfaceVariant }}>
        <Container maxWidth="xl">
          <Typography align="center" variant="h1">
            Our Programs
          </Typography>
          <Stack direction="row" justifyContent="center" flexWrap="wrap" pb={4}>
            {loadingPrograms ? (
              <>
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
              </>
            ) : (
              programs.map((programs) => (
                <ProgramTypeCard
                  key={programs.name}
                  title={programs.name}
                  subtitle={programs.ageRange}
                  image={programs.image}
                  description={programs.description}
                  link={programs.link}
                />
              ))
            )}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Typography align="center" variant="h1">
          About the Club
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ pb: 2, width: { md: "60%", xs: "100%" } }}
          >
            The Burnaby Tennis Club started since 1968 and has served its
            community with affordable memberships, yearly tennis tournaments,
            and coaching new players. Our vision is to enable tennis players to
            play tennis all year round and support players of all skill levels.
            So, whether you are a passionate competitor, an enthusiastic
            learner, or a family of ball strikers, we have a place for you at
            Burnaby Tennis Club.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 10,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              backgroundImage: `url(${club_old_img})`,
              backgroundSize: "cover",
              borderRadius: "12px",
              width: { lg: "60%", md: "70%", xs: "90%" },
              minWidth: "300px",
              height: "30rem",
            }}
          />
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#C2CABF" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              pb: 8,
            }}
          >
            <Paper
              elevation={2}
              square
              sx={{
                backgroundImage: `url(${google_maps_img})`,
                backgroundSize: "cover",
                width: { lg: "30%", md: "40%", sm: "80%", xs: "100%" },
                height: "30rem",
                mt: 10,
              }}
            />
            <Stack>
              <Typography variant="h1">Have a Question?</Typography>
              <TextField
                variant="outlined"
                required
                id="contact-name"
                label="Full name"
              />
              <TextField required id="contact-email" label="Email" />
              <TextField
                required
                multiline
                id="contact-msg"
                rows={7}
                label="Your message..."
              />
              {submit ? (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" startIcon={<CheckIcon />} disabled>
                  Submitted
                </Button>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage;
