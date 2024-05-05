import express from "express";
import * as doctorController from '../controller/doctor-controller.js';
import auth from "../middleware/auth.js";
import {Roles} from "../entities/roles-enum.js";

const router = express.Router();

router.route('/')
    .get(auth([Roles.USER, Roles.ADMIN, Roles.DOCTOR]), doctorController.searchDoctors)
    .post(auth([Roles.ADMIN]), doctorController.createDoctor);

router.route('/getAllDoctors')
    .get(auth([Roles.USER, Roles.ADMIN, Roles.DOCTOR]), doctorController.getAllDoctors)

router.route('/getSpecializations')
    .get(auth([Roles.USER, Roles.ADMIN, Roles.DOCTOR]), doctorController.getSpecializations);

router.route('/:id')
    .get(auth([Roles.USER, Roles.ADMIN, Roles.DOCTOR]), doctorController.getDoctor)
    .put(auth([Roles.ADMIN]), doctorController.updateDoctor)
    .delete(auth([Roles.ADMIN]), doctorController.deleteDoctor);

export default router;
