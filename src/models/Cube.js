const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50, //check real length
    },
    imageUrl: {
        type: String,
        required: true,
        //add http/https validation
    },
    dificultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;