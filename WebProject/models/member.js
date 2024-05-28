const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    membershipStatus: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
