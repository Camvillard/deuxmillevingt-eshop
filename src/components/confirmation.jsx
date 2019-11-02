import React, {Component} from 'react';
import axios from 'axios';


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
