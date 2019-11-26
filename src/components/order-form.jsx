// external librairies
import React, {Component} from 'react';
import axios from 'axios';
import Slider from "react-slick";

// internal components
// import CheckoutForm from "./checkout-form";
// import Confirmation from "./confirmation";

// styles & assets

class OrderForm extends Component {

  changeQuantity = (e) => {
    const input = document.querySelector("#quantity-input")
    e.target.dataset.action === "increase" ? input.value ++ : input.value --
    this.props.setQuantity(input.value)
  }

  componentDidMount() {
    window.scrollTo(0,0);
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
    console.log(state)
    const shippingOptions = state.shippingOptions
    const calendarPrice = state.quantity * 50 || 0
    const taxes = state.taxes
    const shippingFees = state.selectedShipping ? state.selectedShipping.price_cents /100 : 0
    const totalAmount = Math.ceil((shippingFees + taxes + calendarPrice)*100)/100

    return(
      <div className="page order-page">

        <div className="grid md-8-columns lg-12-columns min-height-100">

          <div className="column is-one lg-is-five left-column">

            <img src="https://res.cloudinary.com/camvillard/image/upload/v1574703096/calendrier/cdltbisou_calendrier-2020.jpg" alt="calendar"/>

            <div className="order-pricing-details">

              <div className="order-detail-group" id="quantity-input-controls">
                <p>quantité :</p>

                <div className="input-arrows-group">
                  <p className="quantity-control controls control-less" data-action="reduce" onClick={this.changeQuantity}>-</p>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity-input"
                    defaultValue="0"
                    onChange={setQuantity} />
                  <p className="quantity-control controls control-plus" data-action="increase" onClick={this.changeQuantity}>+</p>
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

          <div className="column is-one lg-is-six right-column">

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
                        <input type="radio" id={`${ship.id}`} name="shipping" value={ship.price_cents / 100} />
                        <label htmlFor="colis-simple" id={`shipping-${ship.id}`}>{`${ship.name} (${ship.price_cents / 100}$)`}</label>
                      </div>
                    )
                  })
                }

              </div>

              {state.selectedShipping && state.selectedShipping.id === "3" ?
                <p className="">chez Bouche Bée, 3772 Rue Ontario Est à Montréal</p> :
                <span></span>
              }

              <button className="button button-left-border">pré-commander</button>

            </form>


          </div>

        </div>


      </div>
    )

  }
}

export default OrderForm;
