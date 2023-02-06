const Cube = require('../models/Cube');

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (data) => {
    const cube = new Cube(data);

    return cube.save(cube);
}

exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data, { runValidators: true });

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);