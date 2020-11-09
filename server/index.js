const express = require('express');
// CommonJS modules is the only way to import modules in Node
// Not ES2015, where you'd use import thing from 'thing'.
// React gives you access to ES2015, so we have that
// going for us, which is nice.

// This here represents a running express app. It listens.
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'dudes' });
});

// all caps = constant that should be taken mad seriously.
const PORT = process.env.PORT || 5000;
// We won't know the production environment's (Heroku's) PORT ahead of time.
// Have to wait till the last second to know what the PORT is.
// If there is no PORT environment variable declared (i.e. a
// local environment), use 5000.

app.listen(PORT);
