const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username must be at least 5 characters!'],
        unique: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consist only of English letters and digits!'],
    }, 
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 4 characters!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should consist only of English letters and digits!'],
    }
});

userSchema.method('validatePassword', async function(password) {
    return bcrypt.compare(password, this.password);
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;