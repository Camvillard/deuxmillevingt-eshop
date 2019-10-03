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
      pickupMethod: '',
      quantity: 0
    };
  };

  submitOrder = (e)  => {
    e.preventDefault()
    console.log(e)
    this.setPickupPrice()
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
  }

  selectPickupOption = (e) =>  {
    this.setState({
      pickupMethod: e.target.value
    })
  }

  setPickupPrice = () => {
    axios.get('http://localhost:3000/pickups')
    .then(response  =>  {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }



  render() {
    return (
      <React.Fragment>
        {!this.state.formIsComplete
          && <CheckoutForm
            setForm={this.handleFormChange}
            pickupOptions={this.selectPickupOption}
            setQuantity={this.setQuantity}
            defaultEmail={this.state.email}
            submitOrder={this.submitOrder} />}

        {this.state.showConfirmation  && <Confirmation confirmOrder={this.confirmOrder} /> }
      </React.Fragment>
    );
  }
}

export default OrderForm;
