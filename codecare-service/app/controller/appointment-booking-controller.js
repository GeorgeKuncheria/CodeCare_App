import { Roles } from '../entities/roles-enum.js';
import * as appointmentBookingService from '../services/appointment-booking-service.js';
import { setSuccessResponse, setErrorCode } from '../utils/response-handler.js';
import { StatusCodes } from "http-status-codes";
import  mongoose  from 'mongoose';
import * as MedicalDiagnosisService from '../services/medical-diagnosis-service.js';




/**
 * Create an appointment booking
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


export const createAppointmentBooking = async (request, response) => {
    try {
        const appointmentBookingData = request.body;
        appointmentBookingData.user = request.user._id;
        const result = await appointmentBookingService.createAppointmentBooking(appointmentBookingData);
        setSuccessResponse(StatusCodes.CREATED, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};



/**
 * Search for appointment bookings based on the provided query parameters
 * Fetches all the appointment bookings if no parameter given
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


export const search = async (request, response) => {
    try {

        const result = await appointmentBookingService.searchAppointmentBookings(request.query);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Search for appointment bookings based on the provided userId
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


export const searchByUserId = async (request, response) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.user._id);
        const role = request.user.role;
        const query = {};
        if(role === Roles.USER){
            query.user = userId;
        } else if(role === Roles.DOCTOR){
            query.doctor = userId;
        }
        const result = await appointmentBookingService.searchAppointmentBookings(query);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Search for appointment bookings based on the provided doctorId
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


// export const searchByDoctorId = async (request, response) => {
//     try {
//         const { doctorId } = request.params;
//         const result = await appointmentBookingService.searchAppointmentBookings({ doctorId: new mongoose.Types.ObjectId(doctorId) });
//         setSuccessResponse(StatusCodes.OK, result, response);
//     } catch (error) {
//         console.log(error);
//         setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
//     }
// };

/**
 * Delete an appointment booking by its ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */


export const deleteById = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await appointmentBookingService.deleteAppointmentBooking(id);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};

/**
 * Update an appointment booking by its ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const updateById = async (request, response) => {
    try {
        const { appointmentId } = request.params;
        const diagnosisData = { ...request.body };
        const diagnosis = await MedicalDiagnosisService.add(diagnosisData);
        const status =  request.body.status;
        const result = await appointmentBookingService.updateDiagnosisId(diagnosis._id, appointmentId, status);
        setSuccessResponse(StatusCodes.OK, result, response);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
};