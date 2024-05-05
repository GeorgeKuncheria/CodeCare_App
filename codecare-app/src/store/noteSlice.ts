// store/noteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from './../models/Note';
import { AppState } from '.';

export type NotesState = Note[];

const initialState: NotesState = [];

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    loadNotes: (state: NotesState, action: PayloadAction<Note[]>) => {
      return [...action.payload];
    }
  },
});

export const getNotes = (): ((state:AppState) => NotesState) => {
  return (state: AppState) => state.notes;
}

export const { loadNotes } = noteSlice.actions;
export default noteSlice.reducer;
