import axios from "./axios-config.ts";
import {ResponseObject} from "../models/ResponseObject.ts";
import {AxiosError, AxiosResponse, isAxiosError} from "axios";

const parseResponse = <T>(response: AxiosResponse<T>) => {
    const data: T = response.data;
    const responseObject: ResponseObject<T> = {status: response.status, ...data};
    return responseObject;
}

export const search = async <T>(path: string, params: any = {}): Promise<ResponseObject<T[]>> => {
    let response: any = {};
    const query: URLSearchParams = new URLSearchParams(params);
    await axios.get(`/${path}?${query}`).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error;
        } else {
            throw error;
        }
    })
    return parseResponse(response);
};

export const getById = async <T>(path: string, id: string): Promise<ResponseObject<T>> => {
    let response: any = {};
    await axios.get(`/${path}/${id}`).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error;
        } else {
            throw error;
        }
    });
    return parseResponse(response);
};

export const postForm = async <T>(path: string, object: any): Promise<ResponseObject<T>> => {
    let response: any = {};
    await axios.post(`/${path}`, object, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error.response;
        } else {
            throw error;
        }
    })
    return parseResponse(response);
};

export const save = async <T>(path: string, object: T): Promise<ResponseObject<any>> => {
    let response: any = {};
    await axios.post(`/${path}`, JSON.stringify(object), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error;
        } else {
            throw error;
        }
    })
    return parseResponse(response);
};

export const update = async <T>(path: string, object: T): Promise<ResponseObject<any>> => {
    let response: any = {};
    await axios.put(`/${path}/${object.id}`, JSON.stringify(object), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error;
        } else {
            throw error;
        }
    })
    return parseResponse(response);
};

export const deleteById = async (path: string, id: string): Promise<ResponseObject<any>> => {
    let response: any = {};
    await axios.delete(`/${path}/${id}`).then((axiosResponse: AxiosResponse) => {
        response = axiosResponse;
    }).catch((error: Error | AxiosError) => {
        if (isAxiosError(error))  {
            response = error;
        } else {
            throw error;
        }
    })
    return parseResponse(response);
};
