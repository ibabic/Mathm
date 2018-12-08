require('./config/config');

const cors = require('cors');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require("./db/mongoose.js");
const { User } = require("./models/user.js");
const { authenticate } = require("./middleware/authenticate");

var app =  express();
const port = process.env.PORT || 3000;

var corsOptions = {
    exposedHeaders: ['x-auth']
  }
  

app.use(bodyParser.json());
app.use(cors(corsOptions));


app.post('/users', (req, res) => {
    console.log(req.body);
  var body = _.pick(req.body, ['email', 'password','level', 'username']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
   
    res.send(req.user);
  });

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});


app.listen(port, () => {
    console.log(`Started on port ˘${port}`);
})

module.exports = { app };