/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Container,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { getSession } from "../../auth/auth";
import { Link, useNavigate, useParams } from "react-router-dom";

// Icons
import PrintIcon from "@mui/icons-material/Print";

import dayjs from "dayjs";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bugSchema } from "../../../features/admin/validationSchema";

function BugReportForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bugSchema),
    defaultValues: {
      name: "",
      issue: "",
      specify: "",
      description: "",
    },
  });

  const onSubmit = () => {
    console.log("what's up?");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={10}>
        {/* Form */}
        <Typography variant="h3">Report a Bug</Typography>
        <Typography>
          Please use the form below to report a software bug to Burnaby Tennis
          Club. The information will be sent to our software support team and
          addressed accordingly. Thank you!
        </Typography>
        <Stack
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <TextField
            id="name"
            label="name"
            variant="outlined"
            autoFocus
            {...register("name")}
            error={errors.name ? true : false}
            helperText={
              typeof errors.name?.message == "string"
                ? errors.name?.message
                : ""
            }
            sx={{ width: "30%" }}
            margin="dense"
          />
          <FormControl required fullWidth>
            <InputLabel id="issue-label">Type of issue</InputLabel>
            <Controller
              name="issue"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  labelId="issue-label"
                  id="issue"
                  label="Type of issue"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={"booking"}>Booking System</MenuItem>
                  <MenuItem value={"payment"}>Payments</MenuItem>
                  <MenuItem value={"software"}>General Software</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <TextField
            required
            id="specify"
            label="Specify"
            variant="outlined"
            disabled
            fullWidth
            {...register("specify")}
            error={errors.specify ? true : false}
            helperText={
              typeof errors.specify?.message == "string"
                ? errors.specify?.message
                : ""
            }
          />
        </Stack>
        <Stack>
          <TextField
            multiline
            required
            id="description"
            label="Description of bug"
            variant="outlined"
            fullWidth
            {...register("description")}
            error={errors.description ? true : false}
            helperText={
              typeof errors.description?.message == "string"
                ? errors.description?.message
                : ""
            }
          />
        </Stack>
      </Box>

      {/* Form Buttons */}
      <Box display="flex" justifyContent="center" my={5}>
        <Button component={Link} to="/register" sx={{ marginRight: 5 }}>
          Back
        </Button>

        <Button type="submit" color="secondary" variant="contained">
          Next step
        </Button>
      </Box>
    </form>
  );
}

export default BugReportForm;
