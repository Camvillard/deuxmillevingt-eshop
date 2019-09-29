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
      pickup: 'colis simple',
      pickupMethod: '',
    };
  };

  submitOrder = (e)  => {
    e.preventDefault()
    console.log(e)
    axios.post('http://localhost:3000/products', {
      product: {
        name: 'test',
        description: 'test description',
        price_cents: 56
      }
    })
    .then(response => {
        console.log('response', response)
    })
    .catch(error => {
        console.log(error)
    })
  };


  handleFormChange = (e) => {
    this.setState({
      [e.target.value]: e.target.name
    })
  }


  render() {
    return (
      <React.Fragment>
        {!this.state.formIsComplete
          && <CheckoutForm
            setForm={this.handleFormChange}
            setQuantity={this.setQuantity}
            defaultEmail={this.state.email}
            submitOrder={this.submitOrder} />}

        {this.state.showConfirmation  && <Confirmation confirmOrder={this.confirmOrder} /> }
      </React.Fragment>
    );
  }
}

export default OrderForm;
