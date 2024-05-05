import express from "express"
import * as adminController from "../controller/admin-controller.js";

const router = express.Router();

router.route('/getUsers')
    .get(adminController.getUsers);

router.route('/updateUserRole')
    .post(adminController.updateUserRole);


export default router;