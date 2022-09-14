const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ninjaRouter = require("./routes/ninjas");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");
const app = express(); // Creating an express application
const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/ninjasdb")
  .then(() => {
    console.log("Connected to DB successfully!");
  })
  .catch((err) => console.log(`Error has occured: ${err}`));

app.use(cors());
app.use(express.json()); // to be able to parse JSON objects
app.use(logger);
app.use(authenticator);
app.use("/api/ninjas", ninjaRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Successfully running on Port ${PORT}`);
});
