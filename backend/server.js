import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1539419",
  key: "a3c2e3905e70ecd5f15a",
  secret: "9c58963a1d81d9654b9b",
  cluster: "ap2",
  useTLS: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
  const changeStream = mongoose.connection.collection("posts").watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const postDetails = change.fullDocument;
      pusher.trigger("postez", "inserted", {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

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

//api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));
app.post("/upload", (req, res) => {
  const dbPost = req.body;
  console.log(dbPost);
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

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
