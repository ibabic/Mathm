require('./config/config');

const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require("./db/mongoose.js");
const { User } = require("./models/user.js");
const { authenticate } = require("./middleware/authenticate");
const { randomArguments } = require("./db/game");


var app =  express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;

var corsOptions = {
    exposedHeaders: ['x-auth']
  }


app.use(bodyParser.json());
app.use(cors(corsOptions));

io.on('connection', (socket) => {
    console.log('New user connected');
});
setArguments();
function setArguments () {
    var array = randomArguments();
    io.sockets.emit('listArguments', array);
}

function removeArguments () {
    var array = [];
    io.sockets.emit('removeArguments', array);
}

firstTimer();
function firstTimer () {
var counter = 15;
  var WinnerCountdown = setInterval(function(data){
    io.sockets.emit('counter', {timer: counter, over : false});
    counter--
    if (counter < 0) {
       clearInterval(WinnerCountdown);
       secondTimer();
    }
  }, 1000);}

  function secondTimer () {
    var counter = 10;
  var WinnerCountdown = setInterval(function(data){
    io.sockets.emit('counter', {timer: counter, over :true});
    counter--
    if (counter < 0){
        removeArguments();
    }
    if (counter < 0) {
       clearInterval(WinnerCountdown);
       firstTimer();
       setArguments();
    }
  }, 1000);
  }

app.post('/users', (req, res) => {
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

app.post('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

app.post('/users/getpoints', authenticate, (req, res) => {
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

app.get('/users/rangList', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users.reduce(function(userMap, item) {
            userMap[item.id] = item;
            return userMap;
        }, {}));
    });
});


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

app.post('/results', authenticate, (req, res) => {
    req.user.updatePoints(req.body.result).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

server.listen(port, () => {
    console.log(`Started on port ˘${port}`);
})

module.exports = { app };