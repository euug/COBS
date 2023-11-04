import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";

function LandingFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "#2F322F",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-around"
          textAlign={{ xs: "center", md: "left" }}
          color="#F1F2ED"
          paddingY={5}
        >
          <Box>
            <Typography variant="h2">Location</Typography>
            <Stack direction="row" spacing={1}>
              <PlaceIcon />
              <Typography variant="body1">
                3890 Kensington Ave
                <br />
                Burnaby, BC
                <br />
                V5B 4V8
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="h2">Useful Links</Typography>
            <Link to="/programs/junior" className="footerLink">
              <Typography variant="body1">Junior Clinics</Typography>
            </Link>
            <Link to="/programs/adult" className="footerLink">
              <Typography variant="body1">Adult Clinics</Typography>
            </Link>
            <Link to="/learn" className="footerLink">
              <Typography variant="body1">Tennis Lessons</Typography>
            </Link>
            <Link to="/register/1" className="footerLink">
              <Typography variant="body1">Register</Typography>
            </Link>
            <Link to="/about" className="footerLink">
              <Typography variant="body1">About Us</Typography>
            </Link>
          </Box>
          <Box>
            <Typography variant="h2">Contact Us</Typography>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <EmailIcon />
              <Typography variant="body1">info@burnabytennis.ca</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon />
              <Typography variant="body1">604-291-0916</Typography>
            </Stack>
          </Box>
        </Stack>
        <Divider />
        <Box sx={{ pt: 2 }}>
          <Typography align="center" variant="body2" color="#F1F2ED">
            Burnaby Tennis Club. Copyright © 2023. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingFooter;
