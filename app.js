const express = require("express");
const ninjaRouter = require("./routes/ninjas");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");
const app = express(); // Creating an express application
const PORT = 3000;

app.use(express.json()); // to be able to parse JSON objects
app.use(logger);
app.use(authenticator);
app.use('/api/ninjas', ninjaRouter)

app.listen(PORT, () => {
  console.log(`Successfully running on Port ${PORT}`);
});