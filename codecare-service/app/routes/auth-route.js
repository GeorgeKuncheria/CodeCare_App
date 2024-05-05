import * as authController from "../controller/auth-controller.js";
import auth from "../middleware/auth.js";
import {Roles} from "../entities/roles-enum.js";
import express from "express";

const router = express.Router();

router.route('/logout')
    .get(auth([Roles.ADMIN, Roles.DOCTOR, Roles.USER]), authController.logout);

export default router;