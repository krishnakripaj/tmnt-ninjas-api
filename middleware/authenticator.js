function authenticate(req, res, next) {
  console.log("Authenticating the user ...... ");
  next();
}

module.exports = authenticate;
