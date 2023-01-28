const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);

router.use('/cube', cubeController);

router.get('*/404', homeController.getErrorPage);

module.exports = router;