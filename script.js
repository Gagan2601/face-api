const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const app = express();
const route = require('./router/route')

app.use(cors());
app.use(bodyParse.json());
app.use('/',route)

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
