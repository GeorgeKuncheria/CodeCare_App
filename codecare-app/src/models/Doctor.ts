export default interface Doctor {
    id: string,
    specialization: string,
    roomNo: string,
    user: string,
    firstname: string,
    lastname: string,
    address: {
        hospitalName: string,
        city: string
    }
}