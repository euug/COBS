import { Outlet } from "react-router-dom";

import LandingHeader from "./components/LandingHeader";
import LandingFooter from "./components/LandingFooter";

function LandingLayout() {
  return (
    <>
      <LandingHeader />
      <Outlet />
      <LandingFooter />
    </>
  );
}

export default LandingLayout;
