import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../features/auth/auth";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await getSession();
        const group = user.accessToken.payload["cognito:groups"][0];
        switch (group) {
          case null:
            navigate("/");
            break;
          case "Public":
            navigate("/pub");
            break;
          case "Member":
            navigate("/member");
            break;
          case "Staff":
            navigate("/staff");
            break;
          default:
            navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    checkUser(); // check manually the first time because we won't get a Hub event
  }, []);

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

export default HomeRedirect;
