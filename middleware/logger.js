// @desc Logs requests to console
// PUT http://localhost:5000/api/v1/bootcamps/1

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
