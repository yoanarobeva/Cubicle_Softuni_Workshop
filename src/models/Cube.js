const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        validate: [/^[a-zA-Z0-9\s]$/, 'Should consist only of English letters, digits and whitespace!'],
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        validate: [/^[a-zA-Z0-9\s]$/, 'Should consist only of English letters, digits and whitespace!'],
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;