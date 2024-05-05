import {ResponseObject} from "../models/ResponseObject.ts";
import Doctor from "../models/Doctor.ts";
import * as apiService from "./api-service.ts";
import {Specialization} from "../models/Specialization.ts";

export const search = async (params: {} = {}): Promise<ResponseObject<Doctor[]>> => {
    return await apiService.search<Doctor>('doctor/getAllDoctors', params);
}

export const fetchDoctorDetails = async (id: string): Promise<ResponseObject<Doctor>> => {
    return await apiService.getById<Doctor>('doctor', id);
}

export const createOrUpdateDoctor = async (data: Doctor): Promise<ResponseObject<Doctor>> => {
    return await apiService.postForm<Doctor>('doctor', data);
}

export const getSpecializations = async (params: {}): Promise<ResponseObject<Specialization[]>> => {
    return await apiService.search<Specialization>('doctor/getSpecializations', params);
}