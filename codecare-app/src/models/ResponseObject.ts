export interface ResponseObject<T> {
    status: number,
    message?: string,
    data?: T,
    error?: {
        message: string,
        data: any
    }
}