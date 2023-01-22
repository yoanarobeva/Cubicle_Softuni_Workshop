const db = require('../database.json');

exports.getHomePage = (req, res) => {
    let search = req.query.search;
    let minLevel = Number(req.query.from);
    let maxLevel = Number(req.query.to);
    let cubes = db.cubes;

    if (search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        if (minLevel) {
            cubes = cubes.filter(c => Number(c.difficultyLevel) >= minLevel);
        }
        if (maxLevel) {
            cubes = cubes.filter(c => Number(c.difficultyLevel) <= maxLevel);
        }
    }

    res.render('index', {cubes});
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