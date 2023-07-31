const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const db = new Pool({
  connectionString: process.env.DBConfigLink,
  ssl: {
    rejectUnauthorized: false
  }
});

const saltRounds = 10;
const { handleSignin } = require('../controllers/signin');
const { handleRegister } = require('../controllers/register');
const { handleProfile } = require('../controllers/profile');
const { handleImage, handleApiCall } = require('../controllers/image');

// Root path
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Signin route
router.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

// Register route
router.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt, saltRounds);
});

// Profile route
router.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db);
});

// Image route
router.put('/image', (req, res) => {
  handleImage(req, res, db);
});

router.post('/imageurl', (req, res) => {
  handleApiCall(req, res);
});

module.exports = router;