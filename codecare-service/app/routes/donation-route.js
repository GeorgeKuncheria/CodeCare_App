import auth from "../middleware/auth.js";
import express from "express";
import {Roles} from "../entities/roles-enum.js";
import * as donationController from "../controller/donation-controller.js";

const router = express.Router();

router.route('/donate')
    .post(auth([Roles.USER, Roles.DOCTOR, Roles.ADMIN]), donationController.donate);

export default router;