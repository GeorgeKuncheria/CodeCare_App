import express from "express";
import * as ProfileController from "./../controller/profile-controller.js";
import auth from "../middleware/auth.js";
import { Roles } from "../entities/roles-enum.js";

const router = express.Router();

router.route('/')
    .get(auth([Roles.USER]),ProfileController.get)
    .put(auth([Roles.USER]),ProfileController.update)
    .delete(auth([Roles.ADMIN]),ProfileController.remove)
    .post(auth([Roles.USER]),ProfileController.save);
router.route('/expand/:userId')
    .get(ProfileController.searchByUserId);
export default router;