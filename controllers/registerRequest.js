const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  var hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx("login")
      .insert({ email: email, password: hash })
      .returning("email")
      .then((userEmail) => {
        trx("users")
          .insert({
            name: name,
            joined: new Date(),
            email: userEmail[0].email,
          })
          .returning("*")
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.callback);
  });
};

module.exports = {
  handleRegister: handleRegister,
};
