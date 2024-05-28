const express = require('express');
const router = express.Router();
const collection = require('../models/user');

router.post('/signup', async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await collection.findOne({ name });
        if (existingUser) {
            return res.status(400).send('User Already Exists');
        }

        const newUser = new collection({ name, password });
        await newUser.save();

        res.status(201).send('User Registered Successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/signin', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await collection.findOne({ name, password });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        res.status(200).send('Signed in Successfully');
    } catch (error) {
        res.status(500).send('Enter Valid Credentials');
    }
});

module.exports = router;