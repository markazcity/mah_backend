const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//env
dotenv.config();

//load models
const News = require("./models/News");
const Quots = require("./models/Quots");
const Podcast = require("./models/Podcast");

//connect DB
mongoose.connect(process.env.MONGO_URI);

//Read json  files
const newses = JSON.parse(
  fs.readFileSync(`${__dirname}/data/newses.json`, "utf-8")
);
const quotes = JSON.parse(
  fs.readFileSync(`${__dirname}/data/quotes.json`, "utf-8")
);
const podcasts = JSON.parse(
  fs.readFileSync(`${__dirname}/data/podcasts.json`, "utf-8")
);

//import into Db
const importData = async () => {
  try {
    await News.create(newses);
    await Quots.create(quotes);
    await Podcast.create(podcasts);
    console.log("data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete from Db
const deleteData = async () => {
  try {
    await News.deleteMany();
    await Quots.deleteMany();
    await Podcast.deleteMany();
    console.log("data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
