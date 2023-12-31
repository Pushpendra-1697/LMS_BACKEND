const express = require("express");
const app = express();
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const PORT = process.env.port || 8080;

const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");

app.use(express.text());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("yahoo!!!");
});

app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
  }
  console.log(`Listening at port ${PORT}`);
});
