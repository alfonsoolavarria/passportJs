'use strict'

const passport = require('passport')
const CognitoStrategy = require('passport-cognito')

passport.use(new CognitoStrategy({
    userPoolId: userPoolId,
    clientId: clientId,
    region: region
  },
  function(accessToken, idToken, refreshToken, profile, done) {
    console.log('Data de Cognito--TESTS-->',profile);
    done(null,profile)
  }
));
