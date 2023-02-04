const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);

router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/auth', authController);

router.get('*/404', homeController.getErrorPage);

module.exports = router;