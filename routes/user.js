const express = require(`express`);
const router = express.Router();
const Users = require(`../model/user`);
const bcrypt = require('bcrypt');
const jwt = require('../util/token');
const auth = require('../interceptor/interceptor');


router.get('/', auth, async (req, res) => {
    try {
        const users = await Users.find({});
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({
            error: 'Error Retrieving Users! - ' + err
        })
    }
});


router.post('/create', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password)
        return res.status(400).send({
            error: 'Insufficient Data!'
        });
    try {
        if (await Users.findOne({
                email
            }))
            return res.status(400).send({
                error: 'User Already Exists!'
            });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({
            user,
            token: jwt.createUserToken(user.id)
        });
    } catch (err) {
        return res.status(500).send({
            error: 'Error Retrieving user: -' + err
        });
    }
});


router.post('/auth', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password)
        return res.status(400).send({
            error: 'Insufficient Data!'
        })

    try {
        const user = await Users.findOne({
            email
        }).select('+password');
        if (!user)
            return res.status(400).send({
                error: 'User Not Registered!'
            });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok)
            return res.status(401).send({
                error: 'User Authentication Error!'
            });
        user.password = undefined;
        return res.send({
            user,
            token: jwt.createUserToken(user.id)
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: 'Error Retrieving User: -' + err
        });
    }

});

module.exports = router;