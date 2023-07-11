const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://Prudhvi876:Prudhvi876@cluster0.66ack1u.mongodb.net/test`;
const multer = require("multer");
const cors = require("cors");
const imageSchema = require("./models/Images");
app.use(cors());

mongoose
  .connect(mongoURI)
  .then((res) => {
    console.log("Connected to db successfully");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".png")) {
      return cb(new Error("Please upload a JPG"));
    }

    cb(undefined, true);
  },
});

app.post("/", upload.single("upload"), async (req, res) => {
  try {
    const image = new imageSchema({
      avatar: req.file.buffer,
    });
    await image.save();
    return res.status(200).json(image);
  } catch (err) {
    return res.status(400).json("Not able to upload image");
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await imageSchema.find({});
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json("Not able to retrieve the data");
  }
});

app.listen(4000, () => {
  console.log("Backend server is running!");
});
