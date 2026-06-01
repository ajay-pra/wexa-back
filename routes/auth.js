const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organisation = require('../models/Organisation');
const Settings = require('../models/Settings');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, organisationName } = req.body;
    console.log(email, password, organisationName )
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const organisation = new Organisation({ name: organisationName });
    await organisation.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      organisationId: organisation._id
    });
    await user.save();

    const settings = new Settings({ organisationId: organisation._id });
    await settings.save();

    const token = jwt.sign({ userId: user._id, organisationId: user.organisationId }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id, organisationId: user.organisationId }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
