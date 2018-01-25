'use strict'

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
  clientID: clientID,
	clientSecret: clientSecret,
	callbackURL: '/auth2/tests/facebook/callback',
  profileFields: ['id', 'displayName', 'link', 'photos', 'emails', 'gender'],
	}, function(accessToken, refreshToken, profile, done) {
    console.log('Data del profile facebook- TEST--->>',profile);
    done(null,profile)
	}));
