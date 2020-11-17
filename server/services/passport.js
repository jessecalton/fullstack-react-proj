// Gives express the idea of how to handle authentication
const passport = require('passport');
const mongoose = require('mongoose');

// Instructs passport on how to authenticate our users w/ Google.
// Only care about the Strategy class.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// This is how we fetch something out of Mongoose...
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Search our whole collection of users and call done()
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// .use() is a generic register, saying there is a new strategy available.
// Creates a new instance of the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Pass in search criteria
      // Search the Users collection and find one.
      const existingUser = await User.findOne({ googleId: profile.id });
      // existingUser is a model instance of the user that was found, or null
      if (existingUser) {
        // We have found a record, so don't save a new one.
        return done(null, existingUser);
      }
      // Creating a model instance:
      // Make a new record, bc one does not previously exist.
      // Pass in all the properties that a user will have
      const user = await new User({ googleId: profile.id }).save(); // save it
      done(null, user);
    }
  )
);
