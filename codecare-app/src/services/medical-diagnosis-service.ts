import { Note } from "../models/Note";
import { ResponseObject } from "../models/ResponseObject";
import * as apiService from "./api-service";

const medicalDiagnosisApiPath = 'medical-diagnoses';

export const create = async (note: Note): Promise<ResponseObject<Note>> => {
    return await apiService.postForm<Note>(medicalDiagnosisApiPath, note);
}

export const get = async (): Promise<ResponseObject<Note[]>> => {
    return await apiService.search<Note>(medicalDiagnosisApiPath);
}

export const update = async (note: Note): Promise<ResponseObject<void>> => {
    return await apiService.update<Note>(medicalDiagnosisApiPath, note);
}