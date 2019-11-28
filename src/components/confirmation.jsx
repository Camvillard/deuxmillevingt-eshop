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
      showSuccess: false,
      buttonIsDisabled: false
    }
  }

  async submitOrder() {
    this.setState({
      buttonIsDisabled: true
    })
    const {
      totalAmount,
      selectedShipping,
      userId,
      quantity
    } = this.props.state
    console.log(quantity)
    const chargeToken = await this.props.stripe.createToken({name: userId})
    const order = {
      token: chargeToken.token.id,
      price_cents: totalAmount * 100,
      shipping_id: selectedShipping.id,
      user_id: userId,
      quantity: parseInt(quantity, 10)
    }
    console.log(order)
    await axios.post('https://deuxmillevingt-data.herokuapp.com/orders', {
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
          <h3>confirmer la commande</h3>
          <div className="grid content">
            <div className="column is-one left-column">
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
              <p className="confirmation-title price total-amount">total de la commande :</p>
              <p>{totalAmount} $</p>
              <div className="card-form">
                <CardElement style={style} hideIcon={true} />
              </div>
              {this.state.buttonIsDisabled ?
              <p className="button button-left-border">en attente de paiement</p> :
              <p onClick={this.submitOrder} className="button button-left-border">confirmer & payer la commande</p>
            }
            </div>

            <div className="column is-one lg-is-five right-column">
              <img src="https://res.cloudinary.com/camvillard/image/upload/v1574703096/calendrier/calendrier-2020_4.jpg" alt="calendar"/>
            </div>

          </div>
        </div>
        {this.state.showSuccess && <Success email={email} />}
      </Fragment>
    );
  }
}

export default injectStripe(Confirmation);
