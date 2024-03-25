const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 3);
    const user = new User({ username, password: hashedPassword });
    console.log(user)
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error registering user');
  }
});

router.get('/healthcheck', (req, res) => {
  console.log('working')
  res.send("its working")
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
