const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const cubeUtils = require('../utils/cubeUtils');
const AppError = require('../utils/appError');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('cubes/create');
});

router.post('/create', isAuthenticated, async (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.create({ name, description, imageUrl, difficultyLevel, owner: req.user._id });

    res.redirect('/');
})

router.get('/details/:cubeId', async (req, res, next) => {
    try {
        let cube = await cubeService.getOne(req.params.cubeId).populate('accessories').lean();

        const isOwner = cubeUtils.isOwner(req.user, cube)

        res.render('cubes/details', { cube, isOwner });
        
    } catch (error) {
        next(new AppError('There is not such a cube!'));
    }
    
})

router.get('/attach/:cubeId', async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId).lean();
    let accessories = await accessoryService.getAllNotAttached(cube).lean();

    res.render('cubes/attach', { cube, accessories })
});

router.post('/attach/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const accessoryId = req.body.accessory
    const accessory = await accessoryService.getOne(accessoryId);

    cube.accessories.push(accessoryId);

    await cube.save();

    res.redirect(`/cube/details/${cube._id}`);
});

const {handleRequest} = require('../utils/requestUtils')

router.get('/edit/:cubeId', isAuthenticated, async (req, res, next) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cubeUtils.isOwner(req.user, cube)) {
        next(new AppError('You are not an owner!'));
    }

    res.render('cubes/edit', { cube, difficultyLevels });
});

router.post('/edit/:cubeId', isAuthenticated, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    try {

        await cubeService.update(req.params.cubeId, { name, description, imageUrl, difficultyLevel });

        res.redirect(`/cube/details/${req.params.cubeId}`);

    } catch (error) {
        console.log(error.message);
        res.redirect('/404');
    }
})

router.get('/delete/:cubeId', isAuthenticated, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cubeUtils.isOwner(req.user, cube)) {
        res.redirect('/404');
    }

    res.render('cubes/delete', { cube, difficultyLevels });
});

router.post('/delete/:cubeId', isAuthenticated, async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});

module.exports = router;

