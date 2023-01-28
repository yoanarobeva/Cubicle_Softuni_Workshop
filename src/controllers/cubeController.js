const router = require('express').Router();
const Cube = require('../models/Cube');

router.get('/create' ,(req, res) => {
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

    if (cube) {
        res.render('cubes/details', cube)
    } else {
        res.redirect('/404');
    }
})

module.exports = router;

