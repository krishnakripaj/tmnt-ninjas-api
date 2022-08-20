const express = require("express");
const mongoose = require("mongoose");
const ninjaRouter = require("./routes/ninjas");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");
const app = express(); // Creating an express application
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/ninjasdb")
  .then(() => {
    console.log("Connected to DB successfully!");
  })
  .catch((err) => console.log(`Error has occured: ${err}`));

app.use(express.json()); // to be able to parse JSON objects
app.use(logger);
app.use(authenticator);
app.use("/api/ninjas", ninjaRouter);

app.listen(PORT, () => {
  console.log(`Successfully running on Port ${PORT}`);
});
