import Event from "../models/event.js";

/**
 * Search for events based on the keyword/date range/Location/Event status provided in the query parameter
 * @param params
 * @returns {Promise<RegExpExecArray>}
 */
export const searchEvents = async (params = {}) => {
    try {
        const result = await Event.find(params).exec();
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * Get the details of a particular event based on its ID
 * @param id
 * @returns {Promise<RegExpExecArray>}
 */
export const getEventDetails = async (id) => {
    try {
        const event = await Event.findById(id).exec();
        return event;
    } catch (error) {
        throw error;
    }
};

/**
 * Create an event
 * @param eventData
 * @returns {Promise<void>}
 */
export const createEvent = async (eventData) => {
    try {
        const event = new Event(eventData);
        const savedEvent = await event.save();
        return savedEvent;
    } catch (error) {
        throw error;
    }
};

/**
 * Update a given event
 * @param eventDetails
 * @returns {Promise<void>}
 */
export const updateEvent = async (eventDetails) => {
    try {
        const event = new Event(eventDetails);
        return event.save();
    } catch (error) {
        throw error;
    }
}

/**
 * Delete an Event
 * @param eventId
 * @returns {Promise<*>}
 */
export const deleteEvent = async (eventId) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        return deletedEvent;
    } catch (error) {
        throw error;
    }
};
