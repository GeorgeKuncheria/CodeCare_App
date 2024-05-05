import { configureStore } from "@reduxjs/toolkit";
import {loginUserSlice} from "./loginUser-slice.ts";
import {eventSlice} from "./event-slice.ts";
import {noteSlice} from "./noteSlice.ts";
import {profileSlice} from "./ProfileSlice.ts"
import {usersSlice} from "./users-slice.ts";
import { appointmentSlice } from "./appointment-slice.ts";

export const store = configureStore({
    reducer: {
        [loginUserSlice.name] : loginUserSlice.reducer,
        [eventSlice.name] : eventSlice.reducer,
        [noteSlice.name] : noteSlice.reducer,
        [profileSlice.name] : profileSlice.reducer,
        [usersSlice.name] : usersSlice.reducer,
        [appointmentSlice.name]: appointmentSlice.reducer
    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;