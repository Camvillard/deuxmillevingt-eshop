// external librairies
import React, {Component} from 'react';
import axios from 'axios';

// internal components
// import CheckoutForm from "./checkout-form";
// import Confirmation from "./confirmation";

// styles & assets

class OrderForm extends Component {


  reduceQuantity = (e) => {
    const input = document.querySelector("#quantity-input")
    input.value --
    this.props.setQuantity(input.value)
  };

  increaseQuantity = (e) => {
    const input = document.querySelector("#quantity-input")
    input.value ++
    this.props.setQuantity(input.value)
  }

  render() {
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

          <div className="controls control-less" onClick={this.reduceQuantity}><p>moins</p></div>

            <input
              type="text"
              name="quantity"
              id="quantity-input"
              defaultValue="0"
              onChange={setQuantity} />

          <div className="controls control-plus" onClick={this.increaseQuantity}><p>plus</p></div>

            <div className="order-pricing-details">
              <p>valeur de la marchandise : {calendarPrice} $</p>
              <p>expédition : {shippingFees} $ </p>
              <p>taxes : {taxes} $</p>
              <p>montant total : {totalAmount} $ </p>
            </div>

          </div>

          <div className="column is-seven">

            <form action="" onSubmit={submitOrder} className="form-block form-stroked">

              <input
                type="text"
                name="name"
                placeholder="nom, prénom /"
                onBlur={setForm}/>

              <input
                type="email"
                name="email"
                placeholder="adresse email /"
                defaultValue={defaultEmail}
                onBlur={setForm}/>

              <input
                type="text"
                name="address"
                placeholder="adresse /"
                onBlur={setForm}/>

              <input
                type="text"
                name="zipCode"
                placeholder="zipcode /"
                onBlur={setForm}/>

              <input
                type="text"
                name="city"
                placeholder="ville /"
                onBlur={setForm}/>

              <select name="country" id="country" onChange={defineShippingOptions}>
                <option defaultValue>choisir votre pays /</option>
                <option value="Canada">Canada</option>
                <option value="US">US</option>
                <option value="Rest of the world">reste du monde</option>
              </select>

              <div className="form-group">
                {
                  shippingOptions.map( ship => {
                    return(
                      <div className="radio-form-group" key={ship.id} onChange={selectShipping}>
                        <input type="radio" id={`shipping-${ship.id}`} name="shipping" value={ship.price_cents / 100} />
                        <label htmlFor="colis-simple" id={`shipping-${ship.id}`}>{`${ship.name} (${ship.price_cents / 100}$)`}</label>
                      </div>
                    )
                  })
                }

              </div>

              <button className="button button-left-border">pré-commander</button>

            </form>


          </div>

        </div>


      </div>
    )

  }
}

export default OrderForm;
