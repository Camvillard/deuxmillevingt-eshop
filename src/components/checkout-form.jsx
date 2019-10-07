import React, {Component} from 'react';
import axios from 'axios';

const CheckoutForm = (props) => {

  // console.log(props.state)
  const shippingOptions = props.state.shippingOptions
  const calendarPrice = props.state.quantity * 52 || 0
  const taxes = props.state.taxes
  const shippingFees = props.state.shippingFees
  const totalAmount = (shippingFees + taxes + calendarPrice)

  return(
    <div className="checkout">

      <div className="grid 12-columns">

        <div className="column is-five">

          <input type="number" name="quantity" placeholder="3" onChange={props.setQuantity} />

          <div className="order-pricing-details">
            <p>valeur de la marchandise : {calendarPrice} $</p>
            <p>expédition : {shippingFees} $ </p>
            <p>taxes : {taxes} $</p>
            <p>montant total : {totalAmount} $ </p>
          </div>

        </div>

        <div className="column is-seven">

          <form action="" onSubmit={props.submitOrder} className="form-block">

            <input
              type="text"
              name="name"
              placeholder="nom, prénom"
              onBlur={props.setForm}/>

            <input
              type="email"
              name="email"
              placeholder="adresse email"
              defaultValue={props.defaultEmail}
              onBlur={props.setForm}/>

            <input
              type="text"
              name="address"
              placeholder="adresse"
              onBlur={props.setForm}/>

            <input
              type="text"
              name="zipCode"
              placeholder="code postale"
              onBlur={props.setForm}/>

            <input
              type="text"
              name="city"
              placeholder="ville"
              onBlur={props.setForm}/>

            <select name="country" id="country" onChange={props.defineShippingOptions}>
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
                      <input type="radio" id={`shipping-${ship.id}`} name="shipping" value={ship.price_cents / 100} onChange={props.selectShipping} />
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


export default CheckoutForm;
