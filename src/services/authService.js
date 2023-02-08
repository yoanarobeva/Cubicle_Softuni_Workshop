const jwt = require('../lib/jsonwebtoken');

const User = require('../models/User');
const config = require('../config/config');

const AppError = require('../utils/appError');


exports.getUserByUsername = (username) => { return User.findOne({ username }); }

exports.register = (username, password) => { return User.create({ username, password }); }

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    if (!user) {
        throw new AppError('Invalid username or password!', { user });
    }

    const isValid = await user.validatePassword(password)

    if (!isValid) {
        throw new AppError('Invalid username or password!');    }

    const payload = { _id: user._id, username: user.username }
    const token = await jwt.sign(payload, config.SECRET, { expiresIn: '2h' });

    return token;
}