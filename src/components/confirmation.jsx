import React, {Component} from 'react';
import axios from 'axios';

// address: "5409 rue chabot"
// calendarPrice: 52
// city: "Montréal"
// country: "Canada"
// email: "hello@camillevillard.com"
// formIsComplete: false
// initiateUser: true
// name: "camille villard"
// orderIsConfirmed: false
// orderIsPaid: false
// quantity: "2"
// shippingFees: 12
// shippingMethod: "colis simple"
// shippingOptions: (3) [{…}, {…}, {…}]
// showConfirmation: true
// showOrderForm: false
// taxes: 15.57
// totalAmount: 0
// zipCode: "H2H1Z1"

class Confirmation extends Component {

  render() {
    const {
      name,
      address,
      city,
      country,
      email,
      taxes,
      quantity,
      zipCode,
      shippingFees,
      shippingMethod
    } = this.props.state
    const calendarPrice = quantity * 50
    const totalAmount = Math.ceil((calendarPrice + taxes + shippingFees)*100)/100
    return (
      <div className="confirmation-page">
        <h1>confirmer la commande</h1>
        <p>livrer à :</p>
        <div className="infos-customer">
          <p>{name}</p>
          <p>{address}</p>
          <p>{city} {zipCode}</p>
          <p>{country}</p>
        </div>
        <p>mode d'expédition choisi :</p>
        <div className="infos-shipping">
          <p>{shippingMethod}</p>
        </div>
        <p>quntité : {quantity}</p>
        <p className="price total-amount">total de la commande : {totalAmount} $</p>
        <p onClick={this.props.confirmOrder}>confirmer la commande</p>
      </div>
    );
  }
}

export default Confirmation;
