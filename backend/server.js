import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use(cors());

//DB config
const connection_url =
  "mongodb+srv://admin:7Pb9ESc7gzwazGeM@cluster0.vhx0qi4.mongodb.net/instaDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("DB connected"));

//api routes
app.post("/upload", (req, res) => {
  const dbPost = res.body;

  dbModel.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/", (req, res) => res.status(200).send("Hello world"));

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
