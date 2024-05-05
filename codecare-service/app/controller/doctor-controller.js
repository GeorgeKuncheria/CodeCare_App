import * as doctorService from '../services/doctor-service.js';
import {setSuccessResponse, setErrorCode} from '../utils/response-handler.js';
import {StatusCodes} from "http-status-codes";
import {Specializations} from "../entities/specialization-enum.js";
import mongoose from "mongoose";

/**
 * Create a new doctor
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const createDoctor = async (request, response) => {
    try {
        const doctorData = request.body;
        const doctor = await doctorService.searchOne({user: doctorData.user});
        if(doctor) {
            await doctorService.updateDoctorById(doctor._id, request.body);
        } else {
            await doctorService.createDoctor(doctorData);
        }
        const result = await doctorService.searchOne({user: doctorData.user});
        setSuccessResponse(StatusCodes.CREATED, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

export const getAllDoctors = async (request, response) => {
    try {
        const result = await doctorService.search(request.query);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}


/**
 * Search for doctors based on the provided query parameters
 * Fetches all the doctors if no parameter given
 * @param request
 * @param response
 * @returns {Promise<void>}
 */

export const searchDoctors = async (request, response) => {
    try {
        const result = await doctorService.searchOne(request.query);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Get a doctor by their ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


export const getDoctor = async (request, response) => {
    try {
        const {id} = request.params;
        let result;
        result = await doctorService.getById(id);
        if(!result) {
            result = await doctorService.searchOne({user:new mongoose.Types.ObjectId(id)});
        }
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Delete a doctor by their ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const deleteDoctor = async (request, response) => {
    try {
        const {id} = request.params;
        const result = await doctorService.deleteDoctorById(id);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Update a doctor by their ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const updateDoctor = async (request, response) => {
    try {
        const {id} = request.params;
        const result = await doctorService.updateDoctorById(id, request.body);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

export const getSpecializations = async (request, response) => {
    try {
        setSuccessResponse(StatusCodes.OK, Specializations, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}
