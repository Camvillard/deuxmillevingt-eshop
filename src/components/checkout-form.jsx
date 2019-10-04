import React, {Component} from 'react';
import axios from 'axios';

const CheckoutForm = (props) => {

  const initialValue = props.state.quantity * 50
  const shippingFees = props.state.shippingFees
  const taxes = initialValue * 0.14975
  const totalAmount = taxes + initialValue

  return(
    <div className="checkout">

      <div className="grid 12-columns">

        <div className="column is-five">

          <input type="number" name="quantity" placeholder="3" onChange={props.setForm} />

          <div className="order-pricing-details">
            <p>valeur de la marchandise :  {initialValue} $</p>
            <p>expédition : {shippingFees} </p>
            <p>taxes : {taxes} $</p>
            <p>montant total :  {totalAmount} $ </p>

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

            <select name="country" id="country" onChange={props.setForm}>
              <option value="Canada">Canada</option>
              <option value="US">US</option>
              <option value="other">reste du monde</option>
            </select>

            <div className="form-group">
              <input type="radio" id="colis-simple" name="livraison" value="colis simple" onChange={props.pickupOptions} />
              <label htmlFor="colis-simple">colis simple</label>

              <input type="radio" id="colis-suivi" name="livraison" value="colis suivi" onChange={props.pickupOptions} />
              <label htmlFor="colis-suivi">colis suivi</label>

              <input type="radio" id="pickup" name="livraison" value="pickup" onChange={props.pickupOptions} />
              <label htmlFor="pickup">ramassage en boutique</label>
            </div>

            <button>pré-commander</button>

          </form>


        </div>

      </div>


    </div>
  )
}


export default CheckoutForm;
