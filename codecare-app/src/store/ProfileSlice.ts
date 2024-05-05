// Importing necessary utilities from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, Vaccination } from '../models/ProfileState';

// Defining the initial state based on the ProfileState interface
const initialState: ProfileState = {
  name: '',
  age: 0,
  gender: 'Other',
  vaccinations: []
};

// Creating the slice
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Updating profile fields dynamically based on field name and value
    updateProfile: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;  // Use more specific typing if possible
    },
    // Adding a new vaccination record
    addVaccination: (state) => {
      state.vaccinations.push({
        id: `vacc-${Date.now()}`,  // Generating a unique ID for the vaccination
        name: '',
        date: ''
      });
    },
    // Updating specific details of a vaccination entry
    updateVaccination: (state, action: PayloadAction<{ index: number; field: string; value: any }>) => {
      const { index, field, value } = action.payload;
      if (state.vaccinations[index]) {
        (state.vaccinations[index] as any)[field] = value;
      }
    },
    // Removing a vaccination record by index
    removeVaccination: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.vaccinations.splice(index, 1);
    }
  }
});

// Exporting the actions created by the slice
export const {
  updateProfile,
  addVaccination,
  updateVaccination,
  removeVaccination
} = profileSlice.actions;

// Exporting the reducer
export default profileSlice.reducer;
