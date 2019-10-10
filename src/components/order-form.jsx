// external librairies
import React, {Component} from 'react';
import axios from 'axios';

// internal components
import CheckoutForm from "./checkout-form";
import Confirmation from "./confirmation";

// styles & assets

class OrderForm extends Component {

  render() {
    // const state = this.props.state
    // const setForm = this.props.setForm
    // const submitOrder = this.props.submitOrder
    const {
      state,
      setForm,
      submitOrder,
      setQuantity,
      defaultEmail,
      defineShippingOptions,
      selectShipping
      } = this.props
    const shippingOptions = state.shippingOptions
    const calendarPrice = state.quantity * 50 || 0
    const taxes = state.taxes
    const shippingFees = state.shippingFees
    const totalAmount = Math.ceil((shippingFees + taxes + calendarPrice)*100)/100

    return(
      <div className="checkout">

        <div className="grid 12-columns">

          <div className="column is-five">

            <input
              type="number"
              name="quantity"
              placeholder="3"
              onChange={setQuantity} />

            <div className="order-pricing-details">
              <p>valeur de la marchandise : {calendarPrice} $</p>
              <p>expédition : {shippingFees} $ </p>
              <p>taxes : {taxes} $</p>
              <p>montant total : {totalAmount} $ </p>
            </div>

          </div>

          <div className="column is-seven">

            <form action="" onSubmit={submitOrder} className="form-block">

              <input
                type="text"
                name="name"
                placeholder="nom, prénom"
                onBlur={setForm}/>

              <input
                type="email"
                name="email"
                placeholder="adresse email"
                defaultValue={defaultEmail}
                onBlur={setForm}/>

              <input
                type="text"
                name="address"
                placeholder="adresse"
                onBlur={setForm}/>

              <input
                type="text"
                name="zipCode"
                placeholder="code postale"
                onBlur={setForm}/>

              <input
                type="text"
                name="city"
                placeholder="ville"
                onBlur={setForm}/>

              <select name="country" id="country" onChange={defineShippingOptions}>
                <option defaultValue>choisir votre pays</option>
                <option value="Canada">Canada</option>
                <option value="US">US</option>
                <option value="Rest of the world">reste du monde</option>
              </select>

              <div className="form-group">
                {
                  shippingOptions.map( ship => {
                    return(
                      <div className="radio-form-group" key={ship.id}>
                        <input type="radio" id={`shipping-${ship.id}`} name="shipping" value={ship.price_cents / 100} onChange={selectShipping} />
                        <label htmlFor="colis-simple">{`${ship.name} (${ship.price_cents / 100}$)`}</label>
                      </div>
                    )
                  })
                }

              </div>

              <button>pré-commander</button>

            </form>


          </div>

        </div>


      </div>
    )

  }
}

export default OrderForm;
