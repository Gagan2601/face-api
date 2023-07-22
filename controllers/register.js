const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const { email, password, name } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
  
    db.connect((err, client, done) => {
      if (err) {
        return res.status(500).json("Internal Server Error");
      }
  
      // Begin the transaction
      client.query('BEGIN', (err) => {
        if (err) {
          done();
          return res.status(500).json("Internal Server Error");
        }
  
        // Insert into 'login' table
        client.query('INSERT INTO login (hash, email) VALUES ($1, $2) RETURNING email', [hash, email], (err, result) => {
          if (err) {
            client.query('ROLLBACK', () => {
              done();
              return res.status(400).json("Unable to register");
            });
          }
  
          const loginEmail = result.rows[0].email;
  
          // Insert into 'users' table
          client.query('INSERT INTO users (email, name, joined) VALUES ($1, $2, $3) RETURNING *', [loginEmail, name, new Date()], (err, result) => {
            if (err) {
              client.query('ROLLBACK', () => {
                done();
                return res.status(400).json("Unable to register");
              });
            }
  
            // Commit the transaction
            client.query('COMMIT', (err) => {
              if (err) {
                client.query('ROLLBACK', () => {
                  done();
                  return res.status(500).json("Internal Server Error");
                });
              }
              done();
              return res.json(result.rows[0]);
            });
          });
        });
      });
    });
  };
  module.exports={
    handleRegister: handleRegister
};