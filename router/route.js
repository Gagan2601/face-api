const saltRounds = 10;
const express = require('express');
const app = express();
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();
const db = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt,saltRounds)})
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
