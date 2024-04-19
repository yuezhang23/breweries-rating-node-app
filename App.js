import "dotenv/config";
import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import cors from 'cors';
import Breweries from "./Breweries/routes.js";

import UserRoutes from "./Users/routes.js";
import Test from "./Test.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
const DB_NAME = process.env.DB_NAME;

mongoose.connect(CONNECTION_STRING, {dbName: DB_NAME}); // in .env and and environment var and the name is project
const app = express();

app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"] // in .env and environment var
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
Test(app);
Breweries(app);
app.listen(process.env.PORT || 4000);