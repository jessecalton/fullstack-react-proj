const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// https://stripe.com/docs/api/charges/create
module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 dolla fo 5 creds',
      source: req.body.id,
    });
    // Get a reference to the current user model

    // req.user is accessible anywhere thanks to passport
    req.user.credits += 5;
    // Above, we only modify the user. We still have to save it.
    const user = await req.user.save();
    res.send(user);
  });
};
