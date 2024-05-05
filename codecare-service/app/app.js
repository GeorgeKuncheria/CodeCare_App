import cors from 'cors'
import express from 'express'

import mongoose from 'mongoose'
import initializeRoutes from "./routes/index.js";

const initialize = (app) => {
    app.use(cors());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: true}));
    mongoose.connect(process.env.MONGODB_CONNECTION);
    initializeRoutes(app);
}

export default initialize;