const fetch = require('node-fetch');
const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "clarifai",
            "app_id": "main"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + process.env.api
        },
        body: raw
    };
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req, res, db) => {
    const { id } = req.body;
  
    db.query('UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING entries', [id], (err, result) => {
      if (err) {
        return res.status(400).json('Error getting count');
      }
  
      if (result.rows.length === 0) {
        return res.status(400).json('User not found');
      }
      const entries = result.rows[0].entries;
      return res.json(entries);
    });
  };
module.exports = {
    handleImage,
    handleApiCall
};