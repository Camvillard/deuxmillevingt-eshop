// external librairies
import React, {Component} from 'react';
import axios from 'axios';

// internal components
import CheckoutForm from "./checkout-form";
import Confirmation from "./confirmation";

// styles & assets

class OrderForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formIsComplete: false,
      showConfirmation: false,
      orderIsConfirmed: false,
      orderIsPaid: false,
      email: this.props.email,
      country: 'Canada',
      shippingFees: '',
      quantity: 0
    };
  };

  submitOrder = (e)  => {
    e.preventDefault()
    console.log(this.state)
    // this.setPickupPrice()
    // creating an order object
    // axios.post('http://localhost:3000/orders', {
    //   order: {
    //     user_id: this.props.userId,
    //     price_cents: this.state.quantity * 50,
    //   }
    // })
    // .then(response => {
    //     console.log('response', response)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
  };



  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  selectPickupOption = (e) =>  {
    switch(this.state.country) {
      case 'Canada':
        // console.log('you are in Canada');
        this.setShippingFees(1, e.target.value)
        break;
      case 'US':
        // console.log('you are in US');
        this.setShippingFees(1.5, e.target.value)
        break;
      case 'other':
        // console.log('you are in another country')
        this.setShippingFees(2, e.target.value)
        break;
    }

    // this.setState({
    //   shippingFees: e.target.value
    // })

  };

  setShippingFees  = (factor, shippingMethod) => {
    let shippingFees
    switch(shippingMethod) {
      case 'colis simple' :
        // console.log(`colis simple fois ${factor} fois`)
        shippingFees = 15 * factor
        break;
      case 'colis suivi' :
        // console.log(`colis suivi fois ${factor} fois`)
        shippingFees = 25 * factor
        break;
      case 'pickup' :
        // console.log(`ramassage en boutique`)
        shippingFees = 0
        break;
    }
    // console.log(shippingFees)
    this.setState({
      shippingFees
    })
  }


  setPickupPrice = () => {
    axios.get('http://localhost:3000/pickups')
    .then(response  =>  {
      // console.log(response)
    })
    .catch(error => {
      // console.log(error)
    })
  }



  render() {
    return (
      <React.Fragment>
        {!this.state.formIsComplete
          && <CheckoutForm
            state={this.state}
            setForm={this.handleFormChange}
            pickupOptions={this.selectPickupOption}
            defaultEmail={this.state.email}
            submitOrder={this.submitOrder} />}

        {this.state.showConfirmation  && <Confirmation confirmOrder={this.confirmOrder} /> }
      </React.Fragment>
    );
  }
}

export default OrderForm;
