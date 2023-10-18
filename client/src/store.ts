import { configureStore } from "@reduxjs/toolkit";
import regReducer from "./features/registration/sliceRegistration";
import bookingReducer from "./features/bookings/sliceBookings";
import appReducer from "./sliceApp";

export const store = configureStore({
  reducer: {
    registration: regReducer,
    booking: bookingReducer,
    application: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
