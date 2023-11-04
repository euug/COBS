import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import oops from "../assets/images/animated_tennis.gif";
import { useNavigate } from "react-router-dom";

function MissingPage() {
  const navigate = useNavigate();

  return (
    <Box bgcolor="#FFF3CF">
      <Toolbar />
      <Container maxWidth="xl">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Typography variant="display1">404</Typography>
          <Typography align="center" variant="h1">
            Oops, the serve was out.
            <br />
            Second serve!
          </Typography>
          <Button onClick={() => navigate(-1)} variant="contained" size="large">
            Go Back
          </Button>
          <Box
            component="img"
            src={oops}
            sx={{
              width: { xs: "60%", md: "30%" },
              marginTop: "3rem",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default MissingPage;
