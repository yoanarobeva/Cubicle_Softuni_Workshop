const db = require('../database.json');

exports.getHomePage = (req, res) => {
    res.render('index', { cubes: db.cubes });
};

exports.getAboutPage = (req, res) => {
    res.render('about');
}

exports.getErrorPage = (req, res) => {
    res.render('404');
}

exports.search = (req, res) => {
    let search = req.params;
    console.log(search);
}