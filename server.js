const express = require("express");
const cors = require("cors");
const app = express();
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "olivierleducq",
    database: "brain4",
  },
});
const bcrypt = require("bcrypt-nodejs");
const imageRequest = require("./controllers/imageRequest.js");
const registerRequest = require("./controllers/registerRequest.js");
const signinRequest = require("./controllers/signinRequest.js");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("getting root. its fine");
});

app.post("/signin", (req, res) => {
  signinRequest.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  registerRequest.handleRegister(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  imageRequest.handleImageRequest(req, res, db, bcrypt);
});
app.post("/imageUrl", (req, res) => {
  imageRequest.handleApiCall(req, res);
});

app.get("/essais", (req, res) => {
  res.json("votre essais marche");
});

app.listen(3000, () => {
  console.log("app running fine on port 3000");
  console.log(process.env);
});
