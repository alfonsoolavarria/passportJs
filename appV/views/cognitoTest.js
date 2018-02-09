'use strict'

const passport = require('passport')
const CognitoStrategy = require('passport-cognito')
const Key = require('../variablesScope.js')

passport.use(new CognitoStrategy({
    userPoolId: Key.userPoolId,
    clientId:Key.clientIdC,
    region: Key.region
  },
  function(accessToken, idToken, refreshToken, profile, done) {
    console.log('Data de Cognito--TESTS-->',profile);
    done(null,profile)
  }
));
