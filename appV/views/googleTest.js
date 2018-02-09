'use strict'

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Key = require('../variablesScope.js')


passport.use(new GoogleStrategy({
  clientID: Key.clientIDG,
  clientSecret: Key.clientSecretG,
  callbackURL: Key.callbackURLGoogle,
  }, function(token, refreshToken, profile, done) {
    console.log('Data del profile google-TEST--->>',profile);
    done(null,profile)
}));
