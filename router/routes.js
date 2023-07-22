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
const signinController = require('../controllers/signin');
const registerController = require('../controllers/register');
const profileController = require('../controllers/profile');
const imageController = require('../controllers/image');

// Root path
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Signin route
router.post('/signin', (req, res) => {
  signinController.handleSignin(req, res, db, bcrypt);
});

// Register route
router.post('/register', (req, res) => {
  registerController.handleRegister(req, res, db, bcrypt, saltRounds);
});

// Profile route
router.get('/profile/:id', (req, res) => {
  profileController.handleProfile(req, res, db);
});

// Image route
router.put('/image', (req, res) => {
  imageController.handleImage(req, res, db);
});

router.post('/imageurl', (req, res) => {
  imageController.handleApiCall(req, res);
});

module.exports = router;