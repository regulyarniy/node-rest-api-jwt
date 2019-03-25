const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    create(req, res, next) {
        const {name, email, password} = req.body;
        userModel.create({name, email, password}, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.json({status: `success`, message: `User added successfully!!!`, data: null});
            }
        })
    },

    authenticate(req, res, next) {
        userModel.findOne({email: req.body.email}, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get(`secretKey`), {expiresIn: `1h`});
                    res.json({status: `success`, message: `user found!!!`, data: {user: userInfo, token}});
                } else {
                    res.json({status: `error`, message: `Invalid email/password!!!`, data: null});
                }
            }
        })
    }
};
