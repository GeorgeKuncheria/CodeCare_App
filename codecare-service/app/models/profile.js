import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";
import {Sexes} from "../entities/sex-enum.js";


//vaccination Schema
const vaccinationSchema = new mongoose.Schema({
    id :String,
    vaccineName: {
        type: String,
        required: true
    },
    dateAdministered: {
        type: Date,
        required: true
    }
},schemaConfig);

const profileSchema = new mongoose.Schema({
    id: String,
    name:{
        type: String,
        required: true
        },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true,
        enum: [Sexes.MALE, Sexes.FEMALE, Sexes.OTHER]
    },
    vaccinations: [vaccinationSchema],
}, schemaConfig);

const Profile = mongoose.model("profile",profileSchema);
export default Profile;