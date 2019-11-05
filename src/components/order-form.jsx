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

     console.log(state)
    return(
      <div className="page order-page">

        <div className="grid 12-columns">

          <div className="column is-five left-column">

          <h1 className="hide-on-mobile">pré-commande</h1>

            <img src="https://images.unsplash.com/photo-1543168256-4ae2229821f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3168&q=80" alt="calendar"/>

            <div className="order-pricing-details">

              <div className="order-detail-group" id="quantity-input-controls">
                <p>quantité :</p>

                <div className="input-arrows-group">
                  <div className="controls control-less" onClick={this.reduceQuantity}><p>-</p></div>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity-input"
                    defaultValue="0"
                    onChange={setQuantity} />
                  <div className="controls control-plus" onClick={this.increaseQuantity}><p>+</p></div>
                </div>

              </div>

              <div className="order-detail-group">
                <p>valeur de la marchandise :</p> <p> {calendarPrice} $</p>
              </div>

              <div className="order-detail-group">
                <p>expédition :</p> <p> {shippingFees} $ </p>
               </div>
              <div className="order-detail-group">
                <p>taxes :</p> <p> {taxes} $</p>
              </div>

              <div className="order-detail-group strong">
                <p>montant total :</p> <p> {totalAmount} $ </p>
              </div>
            </div>

          </div>

          <div className="column is-seven right-column">

            <h1 className="hide-on-mobile">informations de livraison</h1>

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

              <div className="form-group-row">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="zipcode /"
                  onBlur={setForm}
                  className="if-half"/>

                <input
                  type="text"
                  name="city"
                  placeholder="ville /"
                  onBlur={setForm}
                  className="if-half"/>
              </div>


              <select name="country" id="country" onChange={defineShippingOptions}>
                <option defaultValue className="red">choisir votre pays /</option>
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

              {state.shippingMethod === "3" && (
                <p className="">chez Boubhe Bée, 3772 Rue Ontario Est à Montréal</p>
              )}



              <button className="button button-left-border">pré-commander</button>

            </form>


          </div>

        </div>


      </div>
    )

  }
}

export default OrderForm;
