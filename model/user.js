const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../configuration/config');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    try {
        user.password = await bcrypt.hash(user.password, config.bycript_salts);
    } catch (error) {
        console.log(error);
    }
    return next();
});

module.exports = mongoose.model('User', UserSchema);