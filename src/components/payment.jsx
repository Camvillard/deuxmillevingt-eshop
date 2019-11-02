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
    super(props)
    this.submitOrder = this.submitOrder.bind(this);
  }


  async submitOrder(event) {
    console.log(this.props)
    const {
      totalAmount,
      shippingMethod,
      userId
    } = this.props.order
    const chargeToken = await this.props.stripe.createToken({name: 'Name'})
    console.log(chargeToken)
    const order = {
      token: chargeToken.token.id,
      price_cents: totalAmount * 100,
      shipping_id: parseInt(shippingMethod, 10),
      user_id: userId
    }
    console.log(order)
    await axios.post('http://localhost:3001/orders', {
      order
    })
    .then(response => {
        console.log('response', response)
    })
    .catch(error => {
        console.log(error)
    })

  }


  render() {
    return (
      <div className="payment-page">
        <p>payer l'achat</p>
        <CardElement />
        <button onClick={this.submitOrder}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(Payment);

