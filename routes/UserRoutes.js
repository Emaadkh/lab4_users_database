const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const app = express();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create users
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;




