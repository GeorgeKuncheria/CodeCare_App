import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const medicalDiagnosisSchema = new mongoose.Schema({
    id: String,
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    dateOfTreatment: {
        type: Date,
        required: false
    },
    treatment: String,
}, schemaConfig);

const MedicalDiagnosis = mongoose.model("medicalDiagnosis",medicalDiagnosisSchema);
export default MedicalDiagnosis;



