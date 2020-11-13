const passport = require('passport');

// Pass in `app` argument, since we can assume it will get called with our Express
// app object.
module.exports = (app) => {
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

  // Any user that is authenticated gets logged out
  app.get('/api/logout', (req, res) => {
    // This kills the cookie
    req.logout();
    res.send(req.user);
    // req.user will basically be undefined
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
