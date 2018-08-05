const express = require('express');
const router = express.Router();
const passport = require('passport');

function validateLoginForm(payload) {
    const error = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim() === 0 || payload.username.length === 0) {
        isFormValid = false;
        error.username = 'Xin kiểm tra lại tài khoản';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim() === 0 || payload.password.length === 0) {
        isFormValid = false;
        error.password = 'Xin kiểm tra lại mật khẩu';
    }
    if (!isFormValid) {
        message = 'Xin kiểm tra lại thông tin đăng nhập!';
    }
    return {
        success: isFormValid,
        message,
        error: error
    }
}

function validateSignupForm(payload) {
    let err = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.username !== 'string' || payload.username.trim() === 0) {
        isFormValid = false;
        err.username = 'Xin nhập tài khoản';
    }
    if (!payload || typeof payload.password !== 'string' || payload.username.trim() === 0) {
        isFormValid = false;
        err.password = 'Xin nhập mật khẩu';
    }
    if (!isFormValid) {
        message = 'Xin kiểm tra lại thông tin đăng ký!';
    }
    return {
        success: isFormValid,
        message,
        error: err
    }
}

router.post('/admin/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(401).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.error
        });
    }

    return passport.authenticate('admin-login', (err, token) => {
        if (err) {
            let errors = {};
            errors[err.name] = err.message;
            return res.status(401).json({
                success: false,
                errors: errors
            })
        }

        return res.json({
            success: true,
            message: 'Đăng nhập thành công!',
            errors: {},
            token: token
        });
    })(req, res, next);
});

module.exports = router;