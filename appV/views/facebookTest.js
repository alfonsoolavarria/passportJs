'use strict'

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const Key = require('../variablesScope.js')

passport.use(new FacebookStrategy({
  clientID: Key.clientIDF,
	clientSecret: Key.clientSecretF,
	callbackURL: Key.callbackURLFacebook,
  profileFields: Key.profileFields,
	}, function(accessToken, refreshToken, profile, done) {
    console.log('Data del profile facebook- TEST--->>',profile);
    done(null,profile)
	}));
