import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../features/auth/auth";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  });

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default Logout;
