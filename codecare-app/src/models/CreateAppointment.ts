export default interface CreateAppointment{

    userId:string,
    doctorId:string,
    appointmentDate:string,
    appointmentStartTime:string,
    appointmentEndTime:string,
    issue:Array<string>,
    medicalDiagnosis:string,
    prescription:string,
    status:string
}