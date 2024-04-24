import "dotenv/config";
import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import cors from 'cors';
import Breweries from "./Breweries/routes.js";

import UserRoutes from "./Users/routes.js";
import Test from "./Test.js";
import FollowRoutes from "./Follow/routes.js";
import ClaimRoutes from "./OwnerClaims/routes.js"
import Brees from "./Beers/routes.js";
import Stores from "./Store/routes.js";

const app = express();
const CONNECTION_STRING = "mongodb+srv://bnw:bnwkanbas@cluster0.baftd5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME = process.env.DB_NAME;

mongoose.connect(CONNECTION_STRING, {dbName: "project"}); // in .env and and environment var and the name is project

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
FollowRoutes(app);
Breweries(app);
ClaimRoutes(app);
Test(app);
Brees(app);
Stores(app);
app.listen(process.env.PORT || 4000);