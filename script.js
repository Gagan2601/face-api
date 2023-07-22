const express = require('express');
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();
const db = knex({
    client: 'pg',
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});
const app = express();

app.use(cors());
app.use(bodyParse.json());
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt,saltRounds)})
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
