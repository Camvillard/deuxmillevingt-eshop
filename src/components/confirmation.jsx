// external librairires
import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// internal components
import Success from "./success";


class Confirmation extends Component {

  constructor(props) {
    super(props)
    this.submitOrder = this.submitOrder.bind(this);
    this.state = {
      showSuccess: false
    }
  }


  async submitOrder() {
    const {
      totalAmount,
      selectedShipping,
      userId
    } = this.props.state
    const chargeToken = await this.props.stripe.createToken({name: 'Name'})
    const order = {
      token: chargeToken.token.id,
      price_cents: totalAmount * 100,
      shipping_id: selectedShipping.id,
      user_id: userId
    }
    await axios.post('http://localhost:3001/orders', {
      order
    })
    .then(response => {
      this.setState({showSuccess:  true})
    })
    .catch(error => {
        // console.log(error)
        alert(error)
    })
  }

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
      selectedShipping
    } = this.props.state
    const calendarPrice = quantity * 50
    const shippingFees = selectedShipping.price_cents / 100
    const totalAmount = Math.ceil((calendarPrice + taxes + shippingFees)*100)/100

    const style = {
      base: {
        cssSrc: "https://use.typekit.net/zhb5abj.css",
        backgroundColor: 'white',
        fontFamily: "gemeli-mono, monospace",
        padding: '24px',
        margin: '24px auto',
        fontSize: '16px',
        color: "#242933",
        display: "flex",
        lineHeight: "2",
        '::placeholder': {
          color: '#242933'
        }
      }
    }

    return (
      <Fragment>
        <div className="page confirmation-page">
          <div className="grid content">

            <div className="column is-one lg-is-five left-column">
              <h3>confirmer la commande</h3>
              <p className="confirmation-title">livrer à :</p>
              <div className="infos-customer">
                <p>{name}</p>
                <p>{address}</p>
                <p>{city} {zipCode}</p>
                <p>{country}</p>
              </div>
              <p className="confirmation-title">mode d'expédition choisi :</p>
              <div className="infos-shipping">
                <p>{selectedShipping.name} - {selectedShipping.price_cents / 100} $</p>
              </div>
              <p className="confirmation-title">quantité :</p>
              <p>{`${quantity} ${quantity > 1 ? 'maxis calendriers' : 'maxi calendrier'}`}</p>
            </div>

            <div className="column is-one lg-is-seven right-column">
              <p className="confirmation-title price total-amount">total de la commande :</p>
              <p>{totalAmount} $</p>
              <div className="card-form">
                <CardElement style={style} hideIcon={true} />
              </div>
              <p onClick={this.submitOrder} className="button button-left-border">confirmer & payer la commande</p>
            </div>

          </div>
        </div>
        {this.state.showSuccess && <Success email={email} />}
      </Fragment>
    );
  }
}

export default injectStripe(Confirmation);
