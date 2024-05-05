import mongoose from "mongoose"
import schemaConfig from "./schema-config.js";

export const userSchema = new mongoose.Schema({
    id: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
}, schemaConfig);

const User = mongoose.model("user", userSchema);
export default User;
