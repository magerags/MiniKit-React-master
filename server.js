// DO NOT CHANGE THIS FILE!!!

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/athletes", (req, res) => {
  res.sendFile(__dirname + "/athletes.json");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
