export default interface Appointment {
    appointmentId: string,

    user: {
        userId: string,
        username: string,
        firstname: string,
        lastname: string,
    }

    doctor: {
        id: string,
        firstname: string,
        user: string,
        lastname: string,
        specialization: string,
        roomNo: string,
        address: {
            hospitalName: string,
            city: string
        }
    },

    appointmentDate: string,
    appointmentStartTime: string,
    appointmentEndTime: string,
    issue: Array<string>,
    medicalDiagnosis: string,
    prescription: string,
    status: string


}