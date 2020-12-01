const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // could've used ES6 destructuring here, but we'll keep consistent with the sendgrid docs
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@email.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;
