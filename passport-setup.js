const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()


passport.serializeUser(function(user, done) {
    done(null, user);
  });


  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
    clientSecret: process.env.GOOGLE_SEND,
    callbackURL: "http://localhost:3002/google/callback"
  },


  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));