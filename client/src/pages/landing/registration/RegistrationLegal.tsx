import {
  Typography,
  Stack,
  Box,
  TextField,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Button,
} from "@mui/material";

// React Router
import { Link, useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateLegalAgreement } from "../../../features/registration/sliceRegistration";

import dayjs from "dayjs";

// Defining stepper_steps
import { stepperSteps } from "../../../features/registration/stepperSteps";
const currentStep: number = 5;

function RegistrationLegal() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      object({
        fullName: string().required("Agreement required"),
      })
    ),
    defaultValues: {
      fullName: selector.legalAgreementName,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));

    dispatch(updateLegalAgreement(data.fullName));

    navigate("/register/summary");
    window.scrollTo(0, 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={10}>
        {/* Stepper */}
        <Stepper
          sx={{ display: { xs: "none", md: "flex" } }}
          activeStep={currentStep}
        >
          {stepperSteps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step {...stepProps} key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <LinearProgress
          sx={{ display: { xs: "block", md: "none" } }}
          variant="determinate"
          value={(currentStep / stepperSteps.length) * 100}
        />

        {/* Form */}
        <Typography variant="h3">Legal Agreement</Typography>
        <Stack spacing={{ xs: 0, md: 2 }} direction="column">
          <Typography variant="h4">
            Release, waiver and indemnification
          </Typography>
          <ul>
            <li>
              <Typography>
                The undersigned in consideration for the participant's right to
                participate assumes all risks and hazards incidental to the
                conduct of the Burnaby Tennis Club's activities. The undersigned
                hereby resolves, absolves, indemnifies, and holds harmless the
                City of Burnaby, the Parks and Recreation Commission, the
                Burnaby Tennis Club, and each of their respective directors,
                members, and employees from all claims for damage or injury
                arising there from. Further, the undersigned has read and will
                conform to the Burnaby Tennis Club Membership Information
                Brochure and Rules and Regulations and anti-harassment policy.
              </Typography>
            </li>
          </ul>
          <Typography variant="h4">
            Indemnification by Parent/Guardian (if applicant is under 18 years)
          </Typography>
          <ul>
            <li>
              <Typography>
                In consideration of the Club accepting this application, I agree
                to indemnify the Club, its Executives, directors, successors,
                agents or employees from any claims or demands which might be
                made for any reason against the Club, its Executives, Directors,
                successors, agents or employees, or the City of Burnaby arising
                out of or in consequence of the attendance at or use of the
                facilities of the Club by the minors under my care who applied
                for either membership or participation in activities offered by
                the Club.
              </Typography>
            </li>
          </ul>
          <Typography variant="h4">Refund policy</Typography>
          <ul>
            <li>
              <Typography>Clinics are non refundable</Typography>
            </li>
            <li>
              <Typography>
                Membership fees are non-refundable. However, if within 10 days
                of joining, a member changes their mind and wishes to cancel
                their membership, all paid funds will be refunded, minus a
                $20.00 administrative fee. In the case of injury that prohibits
                a member from active play, a pro-rated refund will be
                considered.
              </Typography>
            </li>
          </ul>
          <Typography variant="h4">Privacy policy</Typography>
          <ul>
            <li>
              <Typography>
                Your privacy is important to us. All personal information
                collected as part of this registration process will only be used
                for the purposes of club administration, sharing club news and
                updates with members, and fostering communication between
                members for social and league activities. This information will
                never be shared with third parties.
              </Typography>
            </li>
          </ul>
          <Typography variant="h4">
            Credit Card and On-line Payment Security
          </Typography>
          <ul>
            <li>
              <Typography>
                The credit card information entered as part of the on-line
                payment process is not stored or in any way housed on Burnaby
                Tennis Club servers, but is 100% protected by Paypal Holdings.
                Paypal is a global financial technology that helps millions of
                people to send and receive payments online. For more information
                on PayPal's security measures, visit
                https://www.paypal.com/us/security/learn-about-paypal-secure-technology
              </Typography>
            </li>
          </ul>
          <Typography variant="h4">Currency</Typography>
          <ul>
            <li>
              <Typography>
                All funds shown by the Club are in Canadian dollars
              </Typography>
            </li>
          </ul>
          <Stack spacing={2} alignItems="center" direction="row">
            <Typography>I, </Typography>
            <Box sx={{ display: "inline-flex" }}>
              <TextField
                id="signature"
                label="Full name"
                {...register("fullName")}
                required
                size="small"
                sx={{ width: 400 }}
                error={errors.fullName ? true : false}
                helperText={errors.fullName?.message}
              />
            </Box>
            <Typography>
              on {`${dayjs().format("MMMM D, YYYY")}`} accept the above Terms &
              Conditions.
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Form Buttons */}
      <Box display="flex" justifyContent="center" my={5}>
        <Button component={Link} to="/register/family" sx={{ marginRight: 5 }}>
          Back
        </Button>

        <Button type="submit" color="secondary" variant="contained">
          Next step
        </Button>
      </Box>
    </form>
  );
}

export default RegistrationLegal;
