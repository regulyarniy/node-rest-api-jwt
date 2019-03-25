/**
 * Made with help of "Building a Restful CRUD API with Node.js, JWT, Bcrypt, Express and MongoDB Tutorial"
 * https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const users = require('./routes/users');
const mongoose = require('./config/database'); // DB config
const jwt = require('jsonwebtoken');

const app = express();

app.set(`secretKey`, `nodeRestApi`); // jwt secret token

const validateUser = (req, res, next) => {
    jwt.verify(req.headers[`x-access-token`], req.app.get(`secretKey`), (err, decoded) => {
        if (err) {
            res.json({status: `error`, message: err.message, data: null})
        } else {
            req.body.userId = decoded.id; // add user id to request
            next();
        }
    })
};

mongoose.connection.on(`error`, console.error.bind(console, `MongoDB connection error:`));

app.use(logger(`dev`));
app.use(bodyParser.urlencoded({extended: false}));

// root
app.get(`/`, (req, res) => {
    res.json({tutorial: `Build REST API with node.js`})
});

// public users
app.use(`/users`, users);

// private movies
app.use(`/movies`, validateUser, movies);

// favicon
app.get(`/favicon.ico`, (req, res) => res.sendStatus(204));

// handle errors
app.use((req, res, next) => {
    const err = new Error(`Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err.status === 404) {
        res.status(404).json({message: "Not found"});
    } else {
        res.status(500).json({message: "Something looks wrong :( !!!"});
    }
    next();
});

app.listen(3000, () => console.log(`Node server listening in port 3000...`));
