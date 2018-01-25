'use strict'

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth2/tests/google/callback',
  }, function(token, refreshToken, profile, done) {
    console.log('Data del profile google-TEST--->>',profile);
    done(null,profile)
}));
