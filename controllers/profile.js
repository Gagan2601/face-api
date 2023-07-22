const handleProfile = (req, res, db) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
      if (err) {
        return res.status(400).json('Error getting user');
      }
  
      if (result.rows.length === 0) {
        return res.status(400).json('Not found');
      }
  
      const user = result.rows[0];
      return res.json(user);
    });
  };
  
module.exports={
    handleProfile
};