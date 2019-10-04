import React, {Component} from 'react';
import axios from 'axios';

const CheckoutForm = (props) => {
  let pickupMethods = []
  axios.get('https://deuxmillevingt-data.herokuapp.com/pickups')
  .then(resp =>  {
    resp.map( r => {
      console.log('pickups methods', r)
      // pickupMethods.push(r.data.data)
    } )
  })

  return(
    <div className="checkout">

      <input type="number" placeholder="3" onChange={props.setQuantity} />

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
          <input type="radio" id="colis-simple" name="livraison" value="colis-simple" onChange={props.pickupOptions} />
          <label htmlFor="colis-simple">colis simple</label>

          <input type="radio" id="colis-suivi" name="livraison" value="colis-suivi" onChange={props.pickupOptions} />
          <label htmlFor="colis-suivi">colis suivi</label>

          <input type="radio" id="pickup" name="livraison" value="pickup" onChange={props.pickupOptions} />
          <label htmlFor="pickup">ramassage en boutique</label>
        </div>

        <button>pré-commander</button>

      </form>
    </div>
  )
}


export default CheckoutForm;
