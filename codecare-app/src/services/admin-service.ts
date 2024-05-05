import {User} from "../models/User.ts";
import {postForm, search} from "./api-service.ts";
import {ResponseObject} from "../models/ResponseObject.ts";

export const searchUsers = async (searchParams: {}): Promise<ResponseObject<User[]>> => {
    return await search<User>('admin/getUsers', searchParams);
}

export const updateUserRole = async (data: { user: '', role: '' }): Promise<ResponseObject<any>> => {
    return await postForm<any>('admin/updateUserRole', data);
}