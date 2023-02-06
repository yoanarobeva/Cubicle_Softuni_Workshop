const Cube = require('../models/Cube');

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (data) => {
    const cube = new Cube(data);

    return cube.save(cube);
}
