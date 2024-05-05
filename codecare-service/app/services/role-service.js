import Role from "../models/role.js"

export const findRoleByName = async (roleName) => {
    try {
        let query = {name: roleName}
        return await Role.findOne(query).exec();
    } catch (error) {
        console.log(error);
        throw error;
    }
}