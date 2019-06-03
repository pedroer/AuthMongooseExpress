const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const db = require('./configuration/db');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/user');


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);
module.exports = app;