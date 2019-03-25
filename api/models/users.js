const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

// define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// hash pass before save

UserSchema.pre(`save`, function (next) {
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
});

module.exports = mongoose.model(`User`, UserSchema);
