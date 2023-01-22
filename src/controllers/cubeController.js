const Cube = require('../models/Cube');
const db = require('../database.json');

exports.getCreateCube = (req, res) => {
    res.render('create');
}

exports.postCreateCube = (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body
    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    Cube.save(cube);
    res.redirect('/');
}

exports.getDetail = (req, res) => {
    let cubeId = req.params.cubeId;
    let cube = db.cubes.find(c => c.id == cubeId);
    if (cube) {
        res.render('details', cube)
    } else {
        res.redirect('/404');
    }
}

