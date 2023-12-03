import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Navigation
import MemberDrawer from "../../layouts/components/MemberDrawer";
import MemberNavBottom from "../../layouts/components/MemberNavBottom";

function MemberClubCreditPurchase() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  return (
    <Box sx={{ display: "flex" }}>
      <MemberDrawer page="Club Credit" />
      <MemberNavBottom page="Credit" />
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mb: 15 }}>
          <Typography variant="h1_home">Purchase Club Credit</Typography>
          <Typography variant="h3">Current Balance</Typography>
          <Typography mt={3} mr={2} sx={{ fontSize: 40, fontWeight: 500 }}>
            $16.00
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/member/checkout" variant="outlined">
              Add $10.00
            </Button>
            <Button component={Link} to="/member/checkout" variant="outlined">
              Add $15.00
            </Button>
            <Button component={Link} to="/member/checkout" variant="outlined">
              Add $20.00
            </Button>
          </Stack>
          <Stack
            display="flex"
            direction="row"
            mt={4}
            alignItems="center"
            spacing={4}
          >
            <NumericFormat
              value={value}
              onValueChange={(values) => {
                setValue(values.value);
              }}
              decimalScale={2}
              fixedDecimalScale
              prefix={"$"}
              customInput={TextField}
              label="Custom amount"
            />
            <Button
              component={Link}
              to="/member/checkout"
              variant="contained"
              disabled={value === ""}
            >
              Add Amount
            </Button>
          </Stack>
          <Button
            sx={{ mt: 2 }}
            color="secondary"
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default MemberClubCreditPurchase;
