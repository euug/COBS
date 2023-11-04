import { createSlice } from "@reduxjs/toolkit";

interface RegState {
  menuOpen: boolean;
}

const initialState: RegState = {
  menuOpen: false,
};

const appSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    closeMenu: (state) => {
      state.menuOpen = false;
    },
    openMenu: (state) => {
      state.menuOpen = true;
    },
  },
});

export const { closeMenu, openMenu } = appSlice.actions;
export default appSlice.reducer;
