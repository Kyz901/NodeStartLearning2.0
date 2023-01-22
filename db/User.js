const { Schema, model } = require('mongoose');
const roles = require('../configs/enums/roles.enum');
const { MIN_PASS_LENGTH } = require("../configs/constats");
const { SECURITY_FIELDS } = require("./enums/security.enum");
const { USER } = require("./enums/db.schemas.enum");

const UserSchema = new Schema({
        firstName: { type: String, trim: true, default: '' },
        lastName: { type: String, trim: true, default: '' },
        email: { type: String, trim: true, lowercase: true, require: true, unique: true },
        phoneNumber: { type: String, trim: true, lowercase: true, unique: true },
        age: { type: Number },
        role: { type: String, enum: Object.values(roles), default: roles.ROLE_USER },
        password: { type: String, require: true, min: MIN_PASS_LENGTH }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, res) {
                for (const field of SECURITY_FIELDS) {
                    delete res[field];
                }
                delete res["id"];
                return res;
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, res) {
                for (const field of SECURITY_FIELDS) {
                    delete res[field];
                }
                return res;
            }
        }
    }
);

module.exports = model(USER, UserSchema);
