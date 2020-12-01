const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // could've used ES6 destructuring here, but we'll keep consistent with the sendgrid docs
const keys = require('../config/keys');

class Mailer extends helper.Mail {}

module.exports = Mailer;
