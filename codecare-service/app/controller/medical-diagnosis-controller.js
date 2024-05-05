import { StatusCodes } from "http-status-codes";
import * as MedicalDiagnosisService from '../services/medical-diagnosis-service.js';
import { setErrorCode, setSuccessResponse } from '../utils/response-handler.js';

export const add = async (req, res) => {
    try {
        const diagnosisData = { ...req.body, user: req.user._id , doctor: req.user._id};  // Include user from authenticated user
        const diagnosis = await MedicalDiagnosisService.add(diagnosisData);
        setSuccessResponse(StatusCodes.CREATED,diagnosis, res);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const search = async (req, res) => {
    try {
        const userId = req.user._id;  // Ensure operation is specific to authenticated user
        const getDiagnosis = await MedicalDiagnosisService.search(userId);
        setSuccessResponse( StatusCodes.OK,getDiagnosis, res);
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params;
        const update = req.body;
        let userIdFromReqUser = req.user._id;
        const userId = await MedicalDiagnosisService.get(id);
        const userIdFromDb = userId.user._id; 
        userIdFromReqUser = String(userIdFromReqUser);
        // Comparing directly as strings
        const isEqual = userIdFromReqUser == userIdFromDb;
        console.log(isEqual);
        if(isEqual){
            const diagnosis = await MedicalDiagnosisService.update(id, update);
            setSuccessResponse(StatusCodes.OK,diagnosis, res);
        }
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params;
        const userId = await MedicalDiagnosisService.get(id);
        const userIdFromDb = userId.user._id;
        let userIdFromReqUser = req.user._id;
        userIdFromReqUser = String(userIdFromReqUser);
        const isEqual = userIdFromDb == userIdFromReqUser;
        if(isEqual){
             await MedicalDiagnosisService.remove(id);
            setSuccessResponse(StatusCodes.NO_CONTENT,{}, res);
        }
    } catch (error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
};
