const { Schema, model } = require('mongoose');
const roles = require('../configs/roles.enum');
const { MIN_PASS_LENGTH } = require("../configs/constats");

const UserSchema = new Schema({
        firstName: { type: String, trim: true, default: '' },
        lastName: { type: String, trim: true, default: '' },
        email: { type: String, trim: true, lowercase: true, require: true, unique: true },
        phoneNumber: { type: String, trim: true, lowercase: true, unique: true},
        age: { type: Number },
        role: { type: String, enum: Object.values(roles), default: roles.ROLE_USER },
        password: { type: String, require: true, min: MIN_PASS_LENGTH }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('User', UserSchema);
