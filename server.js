const hpp = require("hpp");
const path = require("path");
const cors = require("cors");
const xss = require("xss-clean");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
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
const auth = require("./routes/auth");

//connect to database
connectDB();

//app use
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: { name: "Dr. Muhammed Abdul Hakkim Al-Azhari" },
  });
});

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload
// app.use(fileUpload());

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent XSS attacks
app.use(xss());

//prevent hpp param pollutioin
app.use(hpp());

//Mount routes
app.use("/api/v1/auth", auth);
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
