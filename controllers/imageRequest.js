//<--> Clarifai Imports <-->
const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "1d2fa24edb4f42d180ce3e8e1ebb247c",
});
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImageRequest = (req, res, db, knex) => {
  const { email } = req.body;
  db("users")
    .increment("entries", 1)
    .where("email", "=", email)
    .returning("*")
    .then((userIncremented) => res.json(userIncremented[0]));
};

module.exports = {
  handleImageRequest: handleImageRequest,
  handleApiCall: handleApiCall,
};
