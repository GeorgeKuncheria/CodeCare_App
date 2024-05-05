import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../models/User.ts";
import {AppState} from "./index.ts";

export type LoginUserState = User;
const initialState: LoginUserState = JSON.parse(localStorage.getItem("user") || "{}");
export const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: initialState,
    reducers: {
        loadLoginUser: (state: LoginUserState, action: PayloadAction<User>) => {
            return action.payload;
        }
    }
});

export const {loadLoginUser} = loginUserSlice.actions

export const getUser = (): ((state: AppState) => LoginUserState) => {
    return (state: AppState) => state.loginUser;
}

export default loginUserSlice.reducer;