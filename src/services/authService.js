const User = require('../models/User');

exports.getUserByUsername = (username) => { return User.findOne({ username }); }

exports.register = (username, password) => { return User.create({ username, password }); }

exports.login = (username, password) => {
    const user = this.getUserByUsername(username);

    if(!user) {
        throw 'Invalid username ot password!';
    }

    
}