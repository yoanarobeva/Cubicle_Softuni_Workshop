const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        validate: [/^[a-zA-Z0-9\s]+$/, 'Should consist only of English letters, digits and whitespace!'],
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        validate: [/^[a-zA-Z0-9\s]+$/, 'Should consist only of English letters, digits and whitespace!'],
    },

});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;