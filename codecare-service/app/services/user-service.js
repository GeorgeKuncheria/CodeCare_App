import User from "../models/user.js";

export const save = async (user) => {
    const userModel = new User(user);
    return await userModel.save();
}

export const getById = async (id) => {
    return await User.findById(id).exec();
}