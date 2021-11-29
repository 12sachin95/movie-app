import express from "express";
import { Connection } from "./src/db.js";
import { router } from "./src/router/Router.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

Connection();

app.use("/api", router);

app.listen(PORT, () => console.log("app is listening"));
