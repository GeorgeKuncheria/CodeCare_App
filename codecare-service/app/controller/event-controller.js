import * as eventService from '../services/event-service.js';
import { setSuccessResponse, setErrorCode } from '../utils/response-handler.js';
import {StatusCodes} from "http-status-codes";
import {Status} from "../entities/status-enum.js";


/**
 * Search for events based on the keyword/date range/Location/Event status provided in the query parameter
 * Fetches all the notes if no paramter given
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const search = async (request, response) => {
    try {
        let params = {};

        // Search keywords in title and description
        if (request.query.keyword) {
            params.$or = [
                { title: { $regex: request.query.keyword, $options: 'i' } }, // Case-insensitive search in title
                { description: { $regex: request.query.keyword, $options: 'i' } } // Case-insensitive search in description
            ];
        }

        // Filter by date
        if (request.query.fromDate && request.query.toDate) {
            params.date = { $gte: request.query.fromDate, $lte: request.query.fromDate };
        } else if (request.query.fromDate) {
            params.date = { $gte: request.query.fromDate };
        } else if (request.query.toDate) {
            params.date = { $lte: request.query.fromDate };
        }

        // Filter by location
        if (request.query.location) {
            params['location.city'] = request.query.location;
        }

        // Filter by event status
        if (request.query.eventStatus) {
            const status = request.query.eventStatus;
            const currentDate = new Date();
            const currentDateTime = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
            if (status === Status.UPCOMING) {
                params.date = {$gte: currentDateTime};
            } else if (status === Status.COMPLETE) {
                params.date = {$lt: currentDateTime};
            }
        }

        const event = await eventService.searchEvents(params);
        setSuccessResponse(StatusCodes.OK, event, response);
    } catch(error) {
        console.log(error)
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

/**
 * Create an event
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const post = async (request, response) => {
    try {
        const event = await eventService.createEvent({...request.body});
        setSuccessResponse(StatusCodes.OK, event, response);
    } catch (error) {
        console.log(error)
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

/**
 * Get the details of a particular event based on its ID
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const get = async (request, response) => {
    try {
        const event = await eventService.getEventDetails(request.params.id);
        setSuccessResponse(StatusCodes.OK, event, response);
    } catch (error) {
        console.log(error)
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

/**
 * Update a given event
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const put = async (request, response) => {
    try {
        const event = {...request.body};
        const currentEvent = await eventService.getEventDetails(request.params.id);
        if (event.type) currentEvent.type = event.type;
        if (event.date) currentEvent.date = event.date;
        if (event.title) currentEvent.title = event.title;
        if (event.description) currentEvent.description = event.description;
        if (event.organizer) currentEvent.organizer = event.organizer;
        if (event.contactInfo) currentEvent.contactInfo = event.contactInfo;
        if (event.location) currentEvent.location = event.location;
        if (event.eventImage) currentEvent.eventImage = event.eventImage;
        const updatedEvent = await eventService.updateEvent(currentEvent);
        setSuccessResponse(StatusCodes.OK, updatedEvent, response);
    } catch (error) {
        console.log(error)
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}

/**
 * Delete an Event
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export const deleteEvent = async (request, response) => {
    try {
        const id = request.params.id;
        // const event = await eventService.getEventDetails(id);
        const event = await eventService.deleteEvent(id);
        setSuccessResponse(StatusCodes.OK, event, response);
    } catch (error) {
        console.log(error)
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}