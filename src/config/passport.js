const AdminLogin = require('../passport/AdminLoginStrategy');

module.exports = (passport) => {
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.use('admin-login', AdminLogin);
}