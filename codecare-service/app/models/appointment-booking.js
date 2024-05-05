import mongoose, { Schema } from "mongoose";
import schemaConfig from "./schema-config.js";
import { Status } from "../entities/status-enum.js";
import { Issues } from "../entities/issues-enum.js";

// Custom validation function for date format MM/DD/YYYY
function isValidDate(date) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
}

// Custom validation function for time format hh-mm with digits
function isValidTime(time) {
    return /^\d{2}:\d{2}$/.test(time);
}

// Function to add minutes to a time string
function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date(0, 0, 0, hours, mins);
    date.setMinutes(date.getMinutes() + minutes);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Define the appointmentBooking schema
const appointmentBookingSchema = new mongoose.Schema({
    id: String,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    appointmentDate: {
        type: String,
        required: true,
        validate: {
            validator: isValidDate,
            message: "Invalid date format. Use MM/DD/YYYY format."
        }
    },
    appointmentStartTime: {
        type: String,
        required: true,
        validate: {
            validator: isValidTime,
            message: "Invalid time format. Use hh-mm format with digits only."
        }
    },
    appointmentEndTime: {
        type: String,
        required: true,
        validate: {
            validator: isValidTime,
            message: "Invalid time format. Use hh-mm format with digits only."
        },
        default: function () {
            return addMinutes(this.appointmentStartTime, 30);
        }
    },
    issue: {
        type: Object.values(Issues),
        required: true
    },
    medicalDiagnosis: {
        type: Schema.Types.ObjectId,
        ref: 'MedicalDiagnosis'
    },
    status: {
        type: String,
        enum: [Status.BOOKED, Status.CANCELLED, Status.COMPLETE],
        default: Status.BOOKED
    }

}, schemaConfig);

const AppointmentBooking = mongoose.model('appointmentBooking', appointmentBookingSchema);
export default AppointmentBooking;