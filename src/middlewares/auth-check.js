const jwt = require('jsonwebtoken');
const Account = require('../model/Account');
const config = require('../config/index.json');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization || req.body.authorization;
    if (!authorization)
        return res.status(401).end();
    const token = authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decode) => {
        if (err) return res.status(401).end();
        const id = decode.sub;
        return Account.findById(id, (err, account) => {
            if (err || !account) return res.status(401).end();
            next();
        })
    })
}