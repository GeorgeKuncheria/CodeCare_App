import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Appointment from "../models/Appointment.ts";
import { AppState } from ".";


export type appointmentState = Appointment[];
const initiateState: appointmentState = [];
export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: initiateState,
    reducers: {
        loadAppointments: (state: appointmentState, action: PayloadAction<appointmentState>) => {
            return [...action.payload];
        }
    }
});

// Actions
export const { loadAppointments} = appointmentSlice.actions;

// Selectors
export const getAll = (): ((state:AppState) => appointmentState) => {
    return (state: AppState) => state.appointments;
}

export const findById = (id: string | undefined): ((state:AppState) => Event | undefined) => {
    return (state: AppState) => state.appointments.find(ap => ap.id === id);
}

// Reducers
export default appointmentSlice.reducer;