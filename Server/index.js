import express from "express";
import { Connection } from "./src/db.js";
import { router } from "./src/router/Router.js";
import dotenv from "dotenv";
dotenv.config()
const PORT = process.env.PORT;
const app = express();
app.use(express.json())

Connection();


app.use("/api", router);



app.listen(PORT, () => console.log("app is listening"));
