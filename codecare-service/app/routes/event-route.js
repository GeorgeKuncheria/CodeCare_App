import express from "express";
import * as eventController from '../controller/event-controller.js';
import auth from "../middleware/auth.js";
import {Roles} from "../entities/roles-enum.js";

const router = express.Router();

router.route('/')
    .get(eventController.search)
    .post(auth([Roles.ADMIN]), eventController.post);
router.route('/:id')
    .get(eventController.get)
    .put(auth([Roles.ADMIN]), eventController.put)
    .delete(auth([Roles.ADMIN]), eventController.deleteEvent);

export default router;