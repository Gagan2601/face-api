const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
  
    db.query('SELECT email, hash FROM login WHERE email = $1', [email], (err, result) => {
      if (err) {
        return res.status(500).json("Internal Server Error");
      }
  
      if (result.rows.length === 0) {
        return res.status(400).json('Wrong credentials');
      }
  
      const data = result.rows[0];
      const isValid = bcrypt.compareSync(password, data.hash);
  
      if (isValid) {
        db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
          if (err) {
            return res.status(500).json("Internal Server Error");
          }
  
          if (result.rows.length === 0) {
            return res.status(400).json('Unable to get user');
          }
  
          const user = result.rows[0];
          return res.json(user);
        });
      } else {
        return res.status(400).json('Wrong credentials');
      }
    });
  };
module.exports={
    handleSignin: handleSignin
};