// external librairies
import axios from 'axios';
import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

// internal components
// import CheckoutForm from "./checkout-form";
// import Confirmation from "./confirmation";

// styles & assets

class Payment extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
      <div className="payment-page">
        <p>payer l'achat</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(Payment);

