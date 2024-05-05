import Profile from "./../models/profile.js";
import mongoose from "mongoose";

export const searchByUserId = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);
    const result = await Profile.aggregate([
        { 
            $match: { 
                user: objectId 
            } 
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
            $unwind: "$user" 
        },
        {
            $project: {  // Define what to include in the results explicitly
                id: 1,  // Exclude MongoDB default _id from the top level if not needed
                age: 1,
                sex: 1,
                vaccinations: 1,
                user: {  // Construct a user object to include specific details
                    id: "$user._id",
                    username: "$user.username",
                    fullname: { $concat: ["$user.firstname", " ", "$user.lastname"] }
                }
            }
        }
        
    ]).exec();

    return result || null;
};

export const save = async (profileData) => {
    const profile = new Profile(profileData);
    return await profile.save();
};

export const update = async (userId, updateData) => {
    const objectId = new mongoose.Types.ObjectId(userId);  // Convert userId to ObjectId
    return await Profile.findOneAndUpdate({ user: objectId }, updateData, { new: true });
};

export const remove = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);  // Convert userId to ObjectId
    return await Profile.findOneAndDelete({ user: objectId });
};

export const get = async (userId) => {
    
    const objectId = new mongoose.Types.ObjectId(userId);  // Convert userId to ObjectId
    return await Profile.findOne({ user: objectId });
};


