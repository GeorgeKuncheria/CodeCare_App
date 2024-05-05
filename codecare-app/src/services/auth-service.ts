import {postForm, search} from "./api-service.ts";
import {LoginDO} from "../models/LoginDO.ts";
import {ResponseObject} from "../models/ResponseObject.ts";

export const getUser = async(data: {} = {}): Promise<ResponseObject<any>> => {
    return await postForm<any>('public', data);
}

export const login = async (data: {}): Promise<ResponseObject<LoginDO>> => {
    return await postForm<LoginDO>('public/login', data);
}

export const register = async (data: {}): Promise<ResponseObject<any>> => {
    return await postForm<LoginDO>('public/register', data);
}

export const logout = async (): Promise<ResponseObject<any>> => {
    return await search<any>('auth/logout');
}