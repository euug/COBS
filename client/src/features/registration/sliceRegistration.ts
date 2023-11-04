import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FamilyMember {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  allergiesMedications: string;
  conditionsDisabilities: string;
}

interface RegState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateBirth: string;
  gender: string;
  preAddr: string;
  streetAddr: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  otherPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  family: FamilyMember[];
  pictureAgreement: boolean;
  legalAgreementName: string;
}

const initialState: RegState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateBirth: "",
  gender: "female",
  preAddr: "",
  streetAddr: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
  otherPhone: "",
  emergencyName: "",
  emergencyPhone: "",
  family: [],
  pictureAgreement: false,
  legalAgreementName: "",
};

const regSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    updateDateBirth: (state, action: PayloadAction<string>) => {
      state.dateBirth = action.payload;
    },
    updateGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    updatePreAddr: (state, action: PayloadAction<string>) => {
      state.preAddr = action.payload;
    },
    updateStreetAddr: (state, action: PayloadAction<string>) => {
      state.streetAddr = action.payload;
    },
    updateCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    updateProvince: (state, action: PayloadAction<string>) => {
      state.province = action.payload;
    },
    updatePostalCode: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload;
    },
    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    updateOtherPhone: (state, action: PayloadAction<string>) => {
      state.otherPhone = action.payload;
    },
    updateEmergencyName: (state, action: PayloadAction<string>) => {
      state.emergencyName = action.payload;
    },
    updateEmergencyPhone: (state, action: PayloadAction<string>) => {
      state.emergencyPhone = action.payload;
    },
    updateFamily: (state, action: PayloadAction<FamilyMember[]>) => {
      state.family = action.payload;
    },
    addFamily: (state, action: PayloadAction<FamilyMember>) => {
      state.family.push(action.payload);
    },
    deleteFamily: (state, action: PayloadAction<number>) => {
      state.family.splice(action.payload, 1);
    },
    updatePictureAgreement: (state) => {
      state.pictureAgreement = !state.pictureAgreement;
    },
    updateLegalAgreement: (state, action: PayloadAction<string>) => {
      state.legalAgreementName = action.payload;
    },
  },
});

export const {
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
  updateConfirmPassword,
  updateDateBirth,
  updateGender,
  updatePreAddr,
  updateStreetAddr,
  updateCity,
  updateProvince,
  updatePostalCode,
  updatePhone,
  updateOtherPhone,
  updateEmergencyName,
  updateEmergencyPhone,
  updateFamily,
  addFamily,
  deleteFamily,
  updatePictureAgreement,
  updateLegalAgreement,
} = regSlice.actions;
export default regSlice.reducer;
