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
    let cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();

    if (cube) {
        res.render('cubes/details', cube);
    } else {
        res.redirect('/404');
    }
})

router.get('/attach/:cubeId', async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).lean();
    let accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();

    res.render('cubes/attach', { cube, accessories })
});

router.post('/attach/:cubeId', async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessoryId);

    await cube.save();

    res.redirect(`/cube/details/${cube._id}`);
});

module.exports = router;

