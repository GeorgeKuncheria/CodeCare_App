import Login from '../models/login.js';
import mongoose from "mongoose";

const loginSearchPipeling = (params) => {
    return [
        {
            $match: params
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: '$user'
        },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role"
            }
        },
        {
            $unwind: '$role'
        },
        {
            $project: {
                id: "$_id",
                username: "$username",
                user: {
                    id: "$user._id",
                    username: "$user.username",
                    firstname: "$user.firstname",
                    lastname: "$user.lastname",
                    _id: 1
                },
                role: {
                    id: "$role._id",
                    name: "$role.name",
                    description: "$role.description",
                    _id: 1
                },
                tokens: "$tokens",
                _id: 1
            }
        }
    ]
};

export const save = async (login) => {
    const loginModel = new Login(login);
    return await loginModel.save();
}

export const search = async (params) => {
    return await Login.aggregate(loginSearchPipeling(params)).exec().then(data => {
        return data;
    });
}

export const searchOne = async (params) => {
    return await Login.aggregate(loginSearchPipeling(params)).exec().then(data => {
        return data[0];
    });
}

export const findByUsername = async (username) => {
    let query = {
        username: username
    }
    return await Login.find(query).exec();
}

export const findByCredentials = async (username) => {
    try {
        const login = await Login.findOne({username: username});
        if (login) {
            return login;
        }
        return null;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateRole = async (userId, roleId) => {
    try {
        const login = await Login.findOneAndUpdate({user: new mongoose.Types.ObjectId(userId)}, {$set: {role: new mongoose.Types.ObjectId(roleId)}}, {new: true});
        if (login) {
            return login
        }
        return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
