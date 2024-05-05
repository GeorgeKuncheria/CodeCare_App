import jwt from "jsonwebtoken";
import * as authService from "../services/auth-service.js";
import mongoose from "mongoose";
import {setErrorCode} from "../utils/response-handler.js";
import {
    StatusCodes,
} from 'http-status-codes';

const auth = (roles) => async (request, response, next) => {
    try {
        const authorizationHeader = request.header("Authorization");
        if (!authorizationHeader) {
            setErrorCode(StatusCodes.UNAUTHORIZED, response);
            return;
        }
        const token = authorizationHeader.replace("Bearer ", "");
        const secretKey = process.env.JWT_KEY
        const decoded = jwt.verify(token, secretKey);
        const login = await authService.searchOne({
            _id: new mongoose.Types.ObjectId(decoded._id),
            "tokens": token,
        });
        if (!login) {
            setErrorCode(StatusCodes.UNAUTHORIZED, response);
            return;
        }
        if (roles.length && !roles.includes(login.role.name)) {
            setErrorCode(StatusCodes.FORBIDDEN, response);
            return;
        }
        request.user = login.user;
        request.user.role = login.role.name;
        request.token = token;
        next();
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

export default auth;