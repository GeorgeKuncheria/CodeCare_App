import {setErrorCode, setSuccessCode, setSuccessResponse} from "../utils/response-handler.js";
import {StatusCodes} from "http-status-codes";
import Login from "../models/login.js";

export const logout = async (request, response) => {
    try {
        const user = request.user;
        await Login.findOneAndUpdate({user: user._id}, {$set: {tokens: []}}, {new: true});
        setSuccessCode(StatusCodes.OK, response);
    } catch (err) {
        console.log(err);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}