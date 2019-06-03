const mongoose = require(`mongoose`);
const config = require('./config');

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
};

mongoose.connect(config.dbUrl, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Database Connection Error! - ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Application Disconnected from the Database!');
});


mongoose.connection.on('connected', () => {
    console.log('Database Connected!');
});