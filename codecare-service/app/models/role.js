import mongoose, {mongo} from "mongoose";
import schemaConfig from "./schema-config.js";

export const roleSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paths: {
        type: Array,
        required: true,
    }
}, schemaConfig);

const roles = [
    {name: 'ADMIN', description: 'Administrator: full access', paths: ['/auth/login']},
    {name: 'DOCTOR', description: 'Doctor: doctor access', paths: ['/auth/login']},
    {name: 'USER', description: 'User: user access', paths: ['/auth/login']},
];

const Role = mongoose.model('role', roleSchema);
export default Role;