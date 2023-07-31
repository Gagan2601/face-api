const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const mongoose = require('mongoose');
const db = "mongodb+srv://gagan:gagandeep@smartbrain.703ikio.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db)
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err))

const routes = require('./router/routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});