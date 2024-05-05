import express from "express";
import * as appointmentBookingController from '../controller/appointment-booking-controller.js';
import auth from "../middleware/auth.js";
import {Roles} from "../entities/roles-enum.js";

const router = express.Router();

router.route('/admin')
    .get(auth([Roles.ADMIN]),appointmentBookingController.search)


router.route('/')
    .get(auth([Roles.USER, Roles.DOCTOR]),appointmentBookingController.searchByUserId)
    .post( auth([Roles.USER]),appointmentBookingController.createAppointmentBooking);

router.route('/:id')
    .put(auth([Roles.DOCTOR,Roles.USER]),appointmentBookingController.updateById)
    .delete( auth([Roles.ADMIN]),appointmentBookingController.deleteById);

export default router;