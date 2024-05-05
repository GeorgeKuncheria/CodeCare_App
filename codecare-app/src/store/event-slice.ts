import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Event from "../models/Event.ts";
import { AppState } from ".";


export type eventState = Event[];
const initiateState: eventState = [];
export const eventSlice = createSlice({
    name: 'events',
    initialState: initiateState,
    reducers: {
        loadEvents: (state: eventState, action: PayloadAction<eventState>) => {
            return [...action.payload];
        }
    }
});

// Actions
export const { loadEvents} = eventSlice.actions;

// Selectors
export const getAll = (): ((state:AppState) => eventState) => {
    return (state: AppState) => state.events;
}

export const findById = (id: string | undefined): ((state:AppState) => Event | undefined) => {
    return (state: AppState) => state.events.find(ev => ev.id === id);
}

// Reducers
export default eventSlice.reducer;