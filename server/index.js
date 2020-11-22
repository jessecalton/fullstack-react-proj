const express = require('express');
// CommonJS modules is the only way to import modules in Node
// Not ES2015, where you'd use import thing from 'thing'.
// React gives you access to ES2015, so we have that
// going for us, which is nice.

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Have to require 'User' model first because 'passport.js' file makes use of it.
require('./models/User');
require('./models/Survey');
require('./services/passport');
// passport.js doesn't return anything, we only need it to be executed.
// Hence, no variable assignment

// Connecting to mongoose
mongoose.connect(keys.mongoURI);

// This here represents a running express app. It listens.
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    // 30 day session life
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // keys to encrypt our cookie
    // Must be an array, in case we supply multiple keys
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// authRoutes will attach our routes to our Express app.
// `require('./name/of/route)` turns into a function, which is immediately called
// with the express `app` object.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets,
  // like main.js file, or main.css file!
  // Route not found? Look in 'client/build' for the route.
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route.
  // It'll assume react-router has the route. It's the catch-all case.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// all caps = constant that should be taken mad seriously.
const PORT = process.env.PORT || 5000;
// We won't know the production environment's (Heroku's) PORT ahead of time.
// Have to wait till the last second to know what the PORT is.
// If there is no PORT environment variable declared (i.e. a
// local environment), use 5000.

app.listen(PORT);
