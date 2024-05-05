import {ResponseObject} from "../models/ResponseObject.ts";
import {postForm} from "./api-service.ts";

export const donate = async(form: FormData): Promise<ResponseObject<any>> => {
    const data = {
        amount: form.get('amount')
    }
    return await postForm<any>('donations/donate', data);
}