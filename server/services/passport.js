// Gives express the idea of how to handle authentication
const passport = require('passport');

// Instructs passport on how to authenticate our users w/ Google.
// Only care about the Strategy class.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// .use() is a generic register, saying there is a new strategy available.
// Creates a new instance of the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access Token: ', accessToken);
      console.log('refresh Token: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);
