const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose')

const User = mongoose.model('users');

// Serializer user
passport.serializeUser(({id}, done) => {
    done(null, id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Google Strategy
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accesToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then(existingUser => {
                if (existingUser){
                    done(null, existingUser);
                } else {
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
);

