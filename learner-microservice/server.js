require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const dbconfig = require("./config/DBConnect");
const learnerController = require("./controllers/learnerController");
const progressController = require("./controllers/progressController");

app.use(express.json());

app.use("/learner", learnerController);
app.use("/progress", progressController);

const port = process.env.LEARNER_PORT;

app.listen(port, () =>
  console.log(`Learner server running on http://localhost:${port}`)
);

module.exports = app;
