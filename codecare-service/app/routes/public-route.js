import express from "express"
import * as publicController from "../controller/public-controller.js";

const router = express.Router();

router.route("/")
    .post(publicController.get);

router.route('/login')
    .post(publicController.login);

router.route('/register')
    .post(publicController.register);

export default router;