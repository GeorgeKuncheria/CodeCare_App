import {setErrorCode, setSuccessResponse} from "../utils/response-handler.js";
import {StatusCodes} from "http-status-codes";
import * as authService from "../services/auth-service.js"
import * as roleService from "../services/role-service.js";

export const getUsers = async (request, response) => {
    const users = await authService.search(request.query);
    let usersResp = []
    users.forEach((login) => {
        const u = {
            username: login.username,
            firstname: login.user.firstname,
            lastname: login.user.lastname,
            id: login.user._id,
            role: login.role.name
        };
        usersResp.push(u);
    })
    setSuccessResponse(StatusCodes.OK, usersResp, response);
}

export const updateUserRole = async (request, response) => {
    try {
        const user = request.user;
        const role = await roleService.findRoleByName(request.body.role);
        const login = authService.updateRole(request.body.userId, role._id);
        setSuccessResponse(StatusCodes.OK, login, response);
    } catch(error) {
        console.log(error);
        setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}
