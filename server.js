const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const multer = require("multer");
dotenv.config();

//app
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
const errorHandler = require("./middleware/error");

//route files
const news = require("./routes/news");
const quots = require("./routes/quots");
const podcast = require("./routes/podcast");

//connect to database
connectDB();

//app use
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { name: "Brad" } });
});

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload
// app.use(fileUpload());

//Mount routes
app.use("/api/v1/newses", news);
app.use("/api/v1/quotes", quots);
app.use("/api/v1/podcasts", podcast);

//error middleware
app.use(errorHandler);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//port
const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`.yellow.bold);
});

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server & exit immediately
  server.close(() => process.exit(1));
});
