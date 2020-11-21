// Our custom middleware.
// next() passes the request on to the next middleware function

module.exports = (req, res, next) => {
  if (!req.user) {
    // If we go down this path, we short-circuit the rest of the middleware
    // and do not continue on to the next() middleware function
    return res.status(401).send({ error: 'You must log in!' });
  }

  // If there is a user, go on!
  next();
};
