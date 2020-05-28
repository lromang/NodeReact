const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Google Strategy
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accesToken, refreshToken, profile, done) => {
        console.log(accesToken)
        console.log(refreshToken)
        console.log(profile)
    })
);

