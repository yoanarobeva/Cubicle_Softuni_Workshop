const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        alert('Passwords dont match!');
        return res.status(404).end();
    }

    
});

module.exports = router;