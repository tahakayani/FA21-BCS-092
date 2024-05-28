const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// Create a new gym member
router.post('/member', async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve gym members with pagination and search
router.get('/member', async (req, res) => {
    try {
        const { page = 1, search = '' } = req.query;
        const pageSize = 10;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const totalMembers = await Member.countDocuments(query);
        const totalPages = Math.ceil(totalMembers / pageSize);
        const members = await Member.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ members, page: Number(page), totalPages });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve a single gym member by ID
router.get('/member/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a gym member's details
router.put('/member/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a gym member by ID
router.delete('/member/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
