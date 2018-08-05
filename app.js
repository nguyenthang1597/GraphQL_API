const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();
require('./src/config/express')(app, cookieParser, bodyParser, passport, cors);
require('./src/config/mongo');
require('./src/config/passport')(passport);
require('./routes/index')(app);

const server = http.createServer(app);


server.listen(4000, (err) => {
    if(err) console.log(err);
    else console.log('Server is running!');
})
