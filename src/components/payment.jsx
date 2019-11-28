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
    this.state = {
      orderIsPaid: false
    }
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
    await axios.post('https://deuxmillevingt-data.herokuapp.com/orders', {
      order
    })
    .then(response => {
        this.setState({
          orderIsPaid: true
        })
    })
    .catch(error => {
        console.log(error)
    })

  }


  render() {
    const style = {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontFamily: 'gemeli-Mono, monospace',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#BC9B77'
        },
      },
      invalid: {
        color: '#fa755a',
    }

    }
    return (
      <div className="payment-page  page">
        <h1>payer la commande</h1>
        <CardElement style={style} />
        <button onClick={this.submitOrder}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(Payment);

