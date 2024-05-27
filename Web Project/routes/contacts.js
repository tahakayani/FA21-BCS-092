const express = require('express');
const router = express.Router();
const collection = require('../models/contact'); 

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newContact = new collection({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).send('Your Qeuery Has Sent Succesfully');
    } catch (error) {
        console.error('Error saving contact information:', error);
        res.status(500).send('An error occurred while saving contact information');
    }
});

module.exports = router;