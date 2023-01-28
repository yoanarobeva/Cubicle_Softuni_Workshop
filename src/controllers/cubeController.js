const Cube = require('../models/Cube');
const db = require('../database.json');

exports.getCreateCube = (req, res) => {
    res.render('create');
}

exports.postCreateCube = async (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save(cube);

    res.redirect('/');
}

exports.getDetail = async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).lean();

    if (cube) {
        res.render('details', cube)
    } else {
        res.redirect('/404');
    }
}

