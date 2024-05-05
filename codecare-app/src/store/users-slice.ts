import {User} from "../models/User.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "./index.ts";


export type UsersState = User[];
const initialState: UsersState = [];

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        loadUsers: (state: UsersState, action: PayloadAction<User[]>) => {
            return action.payload;
        }
    }
})

export const {loadUsers} = usersSlice.actions;

export const getUsers = (): ((state: AppState) => UsersState) => {
    return (state: AppState) => state.users;
}

export default usersSlice.reducer;