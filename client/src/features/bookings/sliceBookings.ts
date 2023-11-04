import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RegState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any;
}

const initialState: RegState = {
  currentUser: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUser } = bookingSlice.actions;
export default bookingSlice.reducer;
