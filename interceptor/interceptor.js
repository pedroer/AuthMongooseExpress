const jwt = require('jsonwebtoken');
const config = require('../configuration/config');



const auth = (req, res, next) => {
    const token_header = req.headers.token;

    if (!token_header)
        return res.status(401).send({
            error: 'Authorizaton Token Wasnt Sent!'
        });

    jwt.verify(token_header, config.jwt_secret, (err, decoded) => {
        if (err)
            return res.status(401).send({
                error: 'Authorization Token Invalid!'
            })

        res.locals.auth_data = decoded;

        return next();
    })
}

module.exports = auth;