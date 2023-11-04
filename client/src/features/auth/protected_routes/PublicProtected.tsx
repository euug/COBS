/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getSession } from "../auth";

const PublicProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user: any = await getSession();
        user.accessToken.payload["cognito:groups"][0] == "Public"
          ? setIsAuth(true)
          : setIsAuth(false);
      } catch {
        navigate("/login");
      }
    };

    checkUser(); // check manually the first time because we won't get a Hub event
  }, []);

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <Box
          display="flex"
          height="100%"
          justifyItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
export default PublicProtectedRoute;
