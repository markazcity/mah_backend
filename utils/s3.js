require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[0] === "image" ||
    file.mimetype.split("/")[0] === "audio"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

// uploads a file to s3
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      const { originalname } = file;
      cb(null, `uploads/${Date.now().toString()} - ${originalname.toString()}`);
    },
  }),
});
module.exports = upload;
