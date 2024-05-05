import Doctor from './../models/doctor.js';

const doctorSearchPipeline = (params = {}) => {
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
            $project: {
                id: "$_id",
                user: "$user._id",
                specialization: "$specialization",
                roomNo: "$roomNo",
                firstname: "$user.firstname",
                lastname: "$user.lastname",
                address: {
                    hospitalName: "$address.hospitalName",
                    city: "$address.city"
                }
            }
        }
    ]
}


export const search = async (params = {}) => {
    try {
        const result = await Doctor.aggregate(doctorSearchPipeline(params)).exec();
        return result;
    } catch (error) {
        throw error;
    }
};

export const searchOne = async (params = {}) => {
    try {
        const result = await Doctor.findOne(params).exec();
        return result;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    return await Doctor.findById(id).exec();
}

export const createDoctor = async (doctorData) => {
    try {
        const doctor = new Doctor(doctorData);
        const savedDoctor = await doctor.save();
        return savedDoctor;
    } catch (error) {
        throw error;
    }
}

export const updateDoctorById = async (id, doctorData) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, {new: true}).exec();
        return updatedDoctor;
    } catch (error) {
        throw error;
    }
}

export const deleteDoctorById = async (id) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id).exec();
        return deletedDoctor;
    } catch (error) {
        throw error;
    }
}
