module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // response statuses in the 400 range indicate the client did something wrong.
    return res.status(403).send({ error: 'Not enough creds!' });
  }

  next();
};
