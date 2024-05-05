import mongoose, { Schema } from "mongoose";
import schemaConfig from "./schema-config.js";
import {getCodes} from "../entities/specialization-enum.js";

const doctorSchema = new mongoose.Schema({
    id: String,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    specialization: {
        type: String,
        enum: Object.values(getCodes()),
        required: true,
    },
    roomNo: {
        type: String,
        required: true,
    },
    address: {
        hospitalName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        // You can add more address fields like street, state, zipCode, etc. if needed
    }
}, schemaConfig);

const Doctor = mongoose.model('doctor', doctorSchema);
export default Doctor;
