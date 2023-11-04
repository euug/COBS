import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteFamily, updateFamily } from "../sliceRegistration";

// Date libraries
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// React Hook Form
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { familySchema } from "../validationSchema";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  allergiesMedications: string;
  conditionsDisabilities: string;
};

function EditFamilyDialog(props: {
  index: number;
  open: boolean;
  openChanger: (b: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.registration);

  // Open & CLose dialog
  const handleClose = () => {
    props.openChanger(false);
  };

  const handleDelete = () => {
    dispatch(deleteFamily(props.index));
    handleClose();
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(familySchema),
    defaultValues: {
      firstName: selector.family[props.index].firstName,
      lastName: selector.family[props.index].lastName,
      gender: selector.family[props.index].gender,
      allergiesMedications: selector.family[props.index].allergiesMedications,
      conditionsDisabilities:
        selector.family[props.index].conditionsDisabilities,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(JSON.stringify(data, null, 2));

    const oldFamily = selector.family;
    const newFamily = [...oldFamily];
    newFamily[props.index] = {
      ...newFamily[props.index],
      firstName: data.firstName,
      lastName: data.lastName,
      dateBirth: data.dateOfBirth,
      gender: data.gender,
      allergiesMedications: data.allergiesMedications,
      conditionsDisabilities: data.conditionsDisabilities,
    };

    dispatch(updateFamily(newFamily));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit Family Member</DialogTitle>
        <DialogContent>
          <TextField
            id="first-name"
            label="First name"
            fullWidth
            required
            {...register("firstName")}
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message}
          />
          <TextField
            id="last-name"
            label="Last name"
            type="text"
            fullWidth
            required
            {...register("lastName")}
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="dateOfBirth"
            defaultValue=""
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                        error: errors.dateOfBirth ? true : false,
                        helperText: errors.dateOfBirth?.message,
                      },
                    }}
                    sx={{ maxWidth: 500 }}
                  />
                </LocalizationProvider>
              );
            }}
          />
          <Box>
            <FormControl>
              <FormLabel id="gender-radios">Gender</FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Box>
          <TextField
            id="allergies"
            label="Allergies/Medications"
            fullWidth
            multiline
            {...register("allergiesMedications")}
            error={errors.allergiesMedications ? true : false}
            helperText={errors.allergiesMedications?.message}
          />
          <TextField
            id="conditions"
            label="Conditions/Disabilities"
            fullWidth
            multiline
            {...register("conditionsDisabilities")}
            error={errors.conditionsDisabilities ? true : false}
            helperText={errors.conditionsDisabilities?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="warning"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button variant="contained" type="submit">
            Add family member
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default EditFamilyDialog;
