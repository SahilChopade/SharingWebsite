const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MulterError } = require("multer");
const multer = require("multer");
const bcrypt = require("bcrypt");
const upload = multer({ dest: "uploads" });
const File = require("./models/File");
const nodemailer = require("nodemailer");
const sendMail = require("./models/SendMail");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected Successfully!!"))
  .catch((err) => {
    console.error(err);
  });

// app.get("/", (req, res) => {
//   res.send("index");
// });


app.post("/upload", upload.single("file"), async function (req, res) {
  console.log("reached")
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.create(fileData);
  console.log(file);
  res.header("origin", req.headers.origin);
  res.redirect(`/upload/${file.id}`);
});

app.get("/upload/:id", async function (req, res) {
  const id = req.params.id;
  res.render("download", {
    fileLink: `http://${req.headers.host}/file/${id}`,
    fileid: id,
  });
});


app.post("/send/:id", sendMail);

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const id = req.params.id;
  console.log({ id });
  console.log(req.body.password);
  const file = await File.findById(req.params.id);
  if (file.password != null) {
    if (req.body.password == null) {
      console.log("reached");
      res.render("password", { id });
      return;
    }
    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.render("password", { error: true });
      return;
    }
  }
  file.downloadCount++;
  console.log(file.downloadCount);
  await file.save();
  res.header("filename", file.originalName);
  res.download(file.path, file.originalName);
}



app.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  const file = await File.findById(id);
  res.json({ filename: file.originalName });
});

//APP STARTING CONNECTION TO PORT 3000
app.listen(3000, function () {
  console.log("Server is running at port 3000..");
});
