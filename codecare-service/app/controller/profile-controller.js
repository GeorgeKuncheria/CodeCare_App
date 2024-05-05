import { StatusCodes } from "http-status-codes";
import * as ProfileService from '../services/profile-service.js';
import { setErrorCode, setSuccessResponse } from '../utils/response-handler.js';


export const save = async (req, res) => {
    try {
        
        const userData = { ...req.body, user: req.user._id};  // Include userId from authenticated user
        const profile = await ProfileService.save(userData);
        setSuccessResponse(StatusCodes.CREATED, profile, res);

    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
     }
};

export const searchByUserId = async (req, res) => {
   try {
        const userId = req.user._id;  // Assuming userId is passed as a query parameter
        const profile = await ProfileService.searchByUserId(userId);
        setSuccessResponse(StatusCodes.OK, profile, res);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const update = async (req, res) => {
    try {
        const id = req.user._id;  // Assuming id in params is the ObjectId of the user's profile
        const updatedProfile = await ProfileService.update(id, req.body);
        setSuccessResponse(StatusCodes.OK, updatedProfile, res);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.user._id;  // Assuming id in params is the ObjectId of the user's profile
        await ProfileService.remove(id);
        setSuccessResponse(StatusCodes.NO_CONTENT, {}, res);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const get = async (req, res) => {
    try {
        const profile = await ProfileService.get(req.user._id); // Assuming req.params.id is the ObjectId of the profile
        setSuccessResponse(StatusCodes.OK, profile, res);

    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};