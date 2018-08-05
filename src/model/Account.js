const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AccountSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is require!']
    },
    password: {
        type: String,
        require: [true, 'Password is require!']
    },
    role: {
        type: Number,
        require: true,
        default: 0,
        min: 0,
        max: 3
    },
    active: {
        type: Boolean,
        default: true,
        require: true
    },
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info'
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at'
    }
})

AccountSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, cb);
};

AccountSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    return bcrypt.genSalt((err, salt) => {
        if (err) return next(err);
        return bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

const Account = mongoose.model('Account', AccountSchema);

Account.schema.path('username').validate(function (value) {
    let regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
}, 'Invalid username');

Account.schema.path('username').validate(function (value) {
    console.log(value);
    console.log(value.length);
    return !(value.length < 8);
}, 'Username is at least 8 character');

module.exports = Account;