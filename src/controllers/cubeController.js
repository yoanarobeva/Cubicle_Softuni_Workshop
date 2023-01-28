const router = require('express').Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

router.get('/create', (req, res) => {
    res.render('cubes/create');
});

router.post('/create', async (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save(cube);

    res.redirect('/');
})

router.get('/details/:cubeId', async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).lean();
    let cubeAccessories;

    if (cube) {
        res.render('cubes/details', { cube, cubeAccessories })
    } else {
        res.redirect('/404');
    }
})

router.get('/attach/:cubeId', async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).lean();
    let accessories = await Accessory.find().lean();

    res.render('cubes/attach', { cube, accessories })
});

router.post('/attach/:cubeId', async (req, res) => {
    
});

module.exports = router;

