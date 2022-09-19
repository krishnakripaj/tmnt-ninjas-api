function log(req, res, next) {
  console.log("Logging all details of the request .... ");
  next();
}

module.exports = log