const express = require(`express`);
const router = express.Router();
const auth = require('../interceptor/interceptor');

router.get('/', auth, (req, res) => {

    console.log(res.locals.auth_data);

    return res.status(200).send({
        message: `(GET) - This is an important information that unauthorized users should not see it.`
    });

});

router.post('/', auth, (req, res) => {

    return res.status(200).send({
        message: `(POST) - This is an important information that unauthorized users should not see it.`
    });

});

module.exports = router;