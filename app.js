'use strict';
require('./appV/views/passportTest.js');

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const socialTests = require('./appV/views/router.js');
const passport = require('passport');



//view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + "/appV/views");

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));;

//social network tests

// App config
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(passport.initialize());
app.use(passport.session());


// Routes de Passport
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.use('/auth2/tests/',socialTests)

module.exports = app;
