import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Payments extends Component {
  render() {
    // amount is how much moneys in cents, defaults to USD
    // token is a callback function that occurs once the token representing the charge is returned.
    // it should've been called onToken
    return (
      <StripeCheckout
        name='Emaily'
        description='5 bucks for 5 emaily creds'
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
