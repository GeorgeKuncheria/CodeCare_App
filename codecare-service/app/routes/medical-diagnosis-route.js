import express from "express";
import * as MedicalDiagnosisController from "./../controller/medical-diagnosis-controller.js";
import { Roles } from "../entities/roles-enum.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route('/')
    .post(auth([Roles.USER]),MedicalDiagnosisController.add)
    .get(auth([Roles.USER]),MedicalDiagnosisController.search);
router.route('/:id')
    .put(auth([Roles.USER]),MedicalDiagnosisController.update)
    .delete(auth([Roles.USER]),MedicalDiagnosisController.remove);

    
   

export default router;