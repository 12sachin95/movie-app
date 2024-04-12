import express from "express";
import { Connection } from "./src/db.js";
import { router } from "./src/router/Router.js";
import userRouter from "./src/router/userRoutes.js";

import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./src/configurePassport.js";

dotenv.config();
configurePassport();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    keys: ["movie-app"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

Connection();

app.use("/", router);
app.use("/auth", userRouter);

app.listen(PORT, () => console.log("app is listening"));
