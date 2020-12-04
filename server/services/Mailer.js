const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // could've used ES6 destructuring here, but we'll keep consistent with the sendgrid docs
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // Send in our secret keys to allow us access to the Sendgrid API
    this.sgApi = sendgrid(keys.sendGridKey);
    // Mailer boilerplate
    this.from_email = new helper.Email('jessecalton@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // This is some built-in functionality from the helper.Mail class
    this.addContent(this.body);

    // This is how Sendgrid will replace our links with their own link
    this.addClickTracking();
    // take the formatted list from `this.recipients` and register it w/ the actual email
    this.addRecipients();
  }
  // Extracting the email addresses from the subdocument collection
  formatAddresses(recipients) {
    // Must have parentheses to do destructuring with an arrow function
    return recipients.map(({ email }) => {
      // Format the email with the helper
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    // for each recipient, add personalization
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    // from the helpers.Mail base class
    this.addPersonalization(personalize);
  }

  // take the Mailer and send it off to SendGrid
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });
    // send off the request
    try {
      const response = await this.sgApi.API(request);
      return response;
    } catch (error) {
      console.log(error.response.body.errors);
    }
  }
}

module.exports = Mailer;
