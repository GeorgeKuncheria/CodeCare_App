import {
    StatusCodes,
    getReasonPhrase,
} from 'http-status-codes';

export const setResponseCode = (status, response) => {
    response.status(status);
    response.json({
        message: getReasonPhrase(status)
    });
}

export const setSuccessResponseMsg = (message, response) => {
    response.status(StatusCodes.OK);
    response.json({
        message: message
    });
}

export const setSuccessCode = (status, response) => {
    response.status(status);
    response.json({
        message: getReasonPhrase(status)
    })
}

export const setSuccessResponse = (status, data, response) => {
    response.status(status);
    response.json({
        data: data
    });
}

export const setErrorCode = (status, response) => {
    response.status(status);
    response.json({
        error: {
            message: getReasonPhrase(status)
        }
    })
}

export const setErrorResponseMsg = (message, response) => {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    response.json({
        error: {
            message: message
        }
    });
}

export const setErrorResponse = (data, response) => {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    response.json({
        error: {
            data: data
        }
    });
}