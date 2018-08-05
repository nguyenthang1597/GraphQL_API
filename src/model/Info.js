const mongoose = require('mongoose');

const InfoSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    dob: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: Boolean,
        require: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 11,
        trim: true
    },
    idNum: {
        type: String,
        maxlength: 12,
        minlength: 12,
        require: true,
        trim: true
    }
}, {versionKey: false});

let Info = mongoose.model('Info', InfoSchema);

Info.schema.path('email').validate(function (v) {
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !regex.test(v);
}, 'Invalid email!');

Info.schema.path('phone').validate(function(v) {
    var regex = /^(01[2689]|09)[0-9]{8}$/;
    return !regex.test(v);
}, 'Invalid phone number;')

Info.schema.path('idNum').validate(function(v) {
    var regex = /[0-9]{12}$/
    return !regex.test(v)
}, 'Invalid Id number!');

module.exports = Info;