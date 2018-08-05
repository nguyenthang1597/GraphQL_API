const auth = require('./auth/index');
const api = require('./api/index');
const authcheck = require('../src/middlewares/auth-check');
module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/api', api);
}