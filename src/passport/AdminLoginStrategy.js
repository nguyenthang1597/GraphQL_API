const Strategy = require('passport-local').Strategy;
const Account = require('../model/Account');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, (req, username, password, done) => {
    const data = {
        username: username,
        password: password,
        remember: !!req.body.remember
    }

    Account.findOne({
        username: data.username
    }, (err, account) => {
        if(err) {
            console.log(err);
            return done(err);
        }
        if(!account) {
            const error = new Error('Tài khoản không tồn tại!')
            error.name = 'NotExistAccount'
            return done(error);
        }
        if(account.role < 1) {
            const error = new Error('Không có quyền truy cập!');
            error.name = 'NotPermissionAccess';
            return done(error);
        }
        return account.comparePassword(data.password, (err, isMatch) => {
            if(err) return done(err);
            if(!isMatch){
                const error = new Error('Mật khẩu không đúng!');
                error.name = 'IncorrectPassword';
                return done(error);
            }
            const payload = {
                sub: account._id
            }
            let options = {};
            if(!data.remember) {
                options.expiresIn = 3600;
            }
            const token = jwt.sign(payload, config.jwtSecret, options);

            return done(null, token);
        })
    })
})