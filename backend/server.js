import cors from "cors";
import express from "express";
import mongoos from "mongoose";
import Pusher from "pusher";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use(cors());

//DB config

//api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
