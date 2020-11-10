const express = require('express');
// CommonJS modules is the only way to import modules in Node
// Not ES2015, where you'd use import thing from 'thing'.
// React gives you access to ES2015, so we have that
// going for us, which is nice.

// Gives express the idea of how to handle authentication
const passport = require('passport');

// Instructs passport on how to authenticate our users w/ Google.
// Only care about the Strategy class.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// This here represents a running express app. It listens.
const app = express();

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

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // scope is what we want to have access to from that user
  })
);

// Now that we have the "code" from the query string, GoogleStrategy will handle the request differently,
// exchanging the "code" for the actual user profile
app.get('/auth/google/callback', passport.authenticate('google'));

// all caps = constant that should be taken mad seriously.
const PORT = process.env.PORT || 5000;
// We won't know the production environment's (Heroku's) PORT ahead of time.
// Have to wait till the last second to know what the PORT is.
// If there is no PORT environment variable declared (i.e. a
// local environment), use 5000.

app.listen(PORT);
