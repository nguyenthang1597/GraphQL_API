const mongoose = require('mongoose');
const config = require('./index.json');

mongoose.connect(config.mongoUri);

mongoose.Promise = global.Promise;

let connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo is error');
});

module.exports = connection;