import publicRoute from "./public-route.js";
import auth from "../middleware/auth.js";
import adminRoute from "./admin-route.js";
import eventRoute from "./event-route.js";
import {Roles} from "../entities/roles-enum.js";
import authRoute from "./auth-route.js";
import profileRoute from "./profile-route.js";
import medicalDiagnosisRoute from "./medical-diagnosis-route.js"
import donationRoute from "./donation-route.js";
import appointmentBookingRoute from './appointment-booking-route.js';
import doctorRoute from "./doctor-route.js";


const initializeRoutes = (app) => {
    app.use('/api/public', publicRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/admin', auth([Roles.ADMIN]), adminRoute);
    app.use('/api/events', eventRoute);
    app.use('/api/profiles',profileRoute);
    app.use('/api/medical-diagnoses',medicalDiagnosisRoute);
    app.use('/api/donations', donationRoute);
    app.use('/api/appointment-bookings',appointmentBookingRoute);
    app.use('/api/doctor',doctorRoute);
}

export default initializeRoutes;