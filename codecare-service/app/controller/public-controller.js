import {
    setErrorCode, setSuccessCode,
    setSuccessResponse
} from "../utils/response-handler.js";
import * as userService from "../services/user-service.js";
import * as roleService from "../services/role-service.js";
import * as authService from "../services/auth-service.js";
import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import {Roles} from "../entities/roles-enum.js";

export const login = async (request, response) => {
    try {
        const {username} = {...request.body};
        const loginMin = await authService.findByCredentials(username);
        const token = await loginMin.generateAuthToken(process.env.JWT_KEY);
        const login = await authService.searchOne({_id: new mongoose.Types.ObjectId(loginMin._id)});
        const user = {
            username: login.username,
            firstname: login.user.firstname,
            lastname: login.user.lastname,
            id: login.user._id,
            role: login.role.name
        };
        setSuccessResponse(StatusCodes.OK, {user: user, token: token}, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

export const register = async (request, response) => {
    try {
        const {username, firstname, lastname} = {...request.body};
        const existUser = await authService.findByCredentials(username);
        if (existUser === null) {
            const user = await userService.save({username: username, firstname: firstname, lastname: lastname});
            const role = await roleService.findRoleByName(Roles.USER);
            await authService.save({username: username, user: user._id, role: role._id});
        }
        const user = await authService.findByCredentials(username);
        const token = await user.generateAuthToken(process.env.JWT_KEY);
        const userResp = {
            username: user.username,
            firstname: user.user.firstname,
            lastname: user.user.lastname,
            id: user.user._id,
            role: user.role.name
        };
        setSuccessResponse(StatusCodes.OK, {user: userResp, token: token}, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

export const get = async (request, response) => {
    const {username} = {...request.body};
    try {
        const login = await authService.searchOne({username: username});
        if (login === undefined || login === null || login.length === 0) {
            throw new Error("Invalid login");
        }
        setSuccessCode(StatusCodes.OK, response);
    } catch (error) {
        // console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}