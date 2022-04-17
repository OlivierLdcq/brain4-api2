const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  db("login")
    .select("*")
    .where("email", "=", email)
    .then((userThatHasEmail) => {
      const isPasswordValid = bcrypt.compareSync(
        password,
        userThatHasEmail[0].password
      );
      if (isPasswordValid) {
        db("users")
          .select("*")
          .where("email", "=", userThatHasEmail[0].email)
          .then((loggedUser) => res.json(loggedUser[0]));
      } else {
        res.json("error");
      }
    });
};

module.exports = {
  handleSignin: handleSignin,
};
