import {deleteById, postForm, search, update} from './api-service';
import Event from '../models/Event';

const eventAPI = 'events';

/**
 * Searches the events based on the given params. Returns all the envents if no parameter is passed
 * @param params
 */
export const searchEvents = async (params = {}): Promise<Event[]> => {
    const eventArr = await search<{ data: Event[] }>(eventAPI, params);
    return eventArr.data;
}

/**
 * Creates a new Event
 * @param event
 */
export const createEvent = async (event = {}) => {
    return await postForm(eventAPI, event);
}

/**
 * Deletes an event
 * @param id
 */
export const deleteEvent = async (id: string) => {
    return await deleteById(eventAPI, id);
}

/**
 * Updates an existing event
 * @param path
 * @param event
 */
export const updateEvent = async (path: string, event = {}) => {
    return await update(path, event);
}