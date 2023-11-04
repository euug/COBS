// MUI
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// React Router
import { Navigate, Route, Routes } from "react-router-dom";

// Styles & Layouts
import appTheme from "./assets/styles/appTheme";
import LandingLayout from "./layouts/LandingLayout";
import RegistrationLayout from "./layouts/RegistrationLayout";

// Miscellaneous Pages
import Logout from "./pages/Logout";
import MissingPage from "./pages/MissingPage";
import HomeRedirect from "./pages/HomeRedirect";
import RegistrationVerify from "./pages/landing/registration/RegistrationVerify";
import ForgotPassword from "./pages/landing/ForgotPasswordPage.tsx";
import ResetPassword from "./pages/landing/ResetPasswordPage.tsx";

// Landing Pages
import Landing from "./pages/landing/LandingPage";
import LoginPage from "./pages/landing/LoginPage";

// Registration Forms
import RegistrationGeneral from "./pages/landing/registration/RegistrationGeneral";
import RegistrationContact from "./pages/landing/registration/RegistrationContact";
import RegistrationFamily from "./pages/landing/registration/RegistrationFamily";
import RegistrationPicture from "./pages/landing/registration/RegistrationPicture";
import RegistrationLegal from "./pages/landing/registration/RegistrationLegal";
import RegistrationSummary from "./pages/landing/registration/RegistrationSummary";

// Public Pages
import PublicProtectedRoute from "./features/auth/protected_routes/PublicProtected";
import PublicDashboard from "./pages/public/PublicDashboard";
import PublicPrograms from "./pages/public/PublicPrograms";
import PublicAdultClinics from "./pages/public/PublicAdultClinics";
import PublicAdultSession from "./pages/public/PublicAdultSession";
import PublicPayments from "./pages/public/PublicPayments";
import PublicCheckout from "./pages/public/PublicCheckout";
import PublicReceipt from "./pages/public/PublicReceipt";
import PublicJuniorClinics from "./pages/public/PublicJuniorClinics";
import PublicClubCredit from "./pages/public/PublicClubCredit";
import PublicClubCreditPurchase from "./pages/public/PublicClubCreditPurchase";
import PublicBookings from "./pages/public/PublicBookings";
import PublicBookingGrid from "./pages/public/PublicBookCourt";

const theme = createTheme(appTheme);

function AppRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomeRedirect />} />

        {/* Landing Pages */}
        <Route path="/" element={<Navigate to="/landing" replace={true} />} />
        <Route element={<LandingLayout />}>
          <Route path="landing" element={<Landing />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationLayout />}>
            <Route index element={<RegistrationGeneral />} />
            <Route path="contactform" element={<RegistrationContact />} />
            <Route path="family" element={<RegistrationFamily />} />
            <Route path="picture" element={<RegistrationPicture />} />
            <Route path="legal" element={<RegistrationLegal />} />
            <Route path="summary" element={<RegistrationSummary />} />
            <Route path="verify" element={<RegistrationVerify />} />
          </Route>
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>

        {/* Public Pages */}
        <Route path="pub">
          <Route
            index
            element={<PublicProtectedRoute children={<PublicDashboard />} />}
          />
          <Route path="programs">
            <Route
              index
              element={<PublicProtectedRoute children={<PublicPrograms />} />}
            />
            <Route path="adult">
              <Route
                index
                element={
                  <PublicProtectedRoute children={<PublicAdultClinics />} />
                }
              />
              <Route
                path=":sessionid"
                element={
                  <PublicProtectedRoute children={<PublicAdultSession />} />
                }
              />
            </Route>
            <Route path="junior">
              <Route
                index
                element={
                  <PublicProtectedRoute children={<PublicJuniorClinics />} />
                }
              />
              <Route
                path=":sessionid"
                element={
                  <PublicProtectedRoute children={<PublicAdultSession />} />
                }
              />
            </Route>
          </Route>
          <Route path="payments">
            <Route
              index
              element={<PublicProtectedRoute children={<PublicPayments />} />}
            />
            <Route
              path=":transactionid"
              element={<PublicProtectedRoute children={<PublicCheckout />} />}
            />
          </Route>
          <Route path="receipt">
            <Route
              path=":transactionid"
              element={<PublicProtectedRoute children={<PublicReceipt />} />}
            />
          </Route>
          <Route path="clubcredit">
            <Route
              index
              element={<PublicProtectedRoute children={<PublicClubCredit />} />}
            />
            <Route
              path="purchase"
              element={
                <PublicProtectedRoute children={<PublicClubCreditPurchase />} />
              }
            />
          </Route>
          <Route path="bookings">
            <Route
              index
              element={<PublicProtectedRoute children={<PublicBookings />} />}
            />
            <Route
              path="book"
              element={
                <PublicProtectedRoute children={<PublicBookingGrid />} />
              }
            />
          </Route>
        </Route>

        {/* 404 Missing Page */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default AppRoutes;
