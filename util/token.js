const jwt = require('jsonwebtoken');
const config = require('../configuration/config');


module.exports = {
    createUserToken: (userId) => {
        return jwt.sign({
                id: userId
            },
            config.jwt_secret, {
                expiresIn: config.jwt_expires
            });
    }
}