require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts.routes");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// Connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB && Listening on Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection failed:", error.message);
  });
