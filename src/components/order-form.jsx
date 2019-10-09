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
      country: '',
      shippingFees: 0,
      shippingOptions: [],
      quantity: 0,
      totalAmount: 0,
      taxes: 0,
      calendarPrice: 52
    };
  };

  submitOrder = (e)  => {
    e.preventDefault()
    if (this.state.name && this.state.address && this.state.zipCode) {
      this.setState({
        formIsComplete: true,
        showConfirmation: true
      })
    } else {
      alert('missing something')
    }
    // //creating an order object
    // axios.post('http://localhost:3001/orders', {
    //   order: {
    //     user_id: this.props.userId,
    //     price_cents: this.state.totalAmount,
    //   }
    // })
    // .then(response => {
    //     console.log('response', response)
    // })
    // .catch(error => {
    //     console.log(error)
    // })

    // }
    // this.setPickupPrice()
  };

  confirmOrder = () => {
    console.log('confirm')
  }



  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  setQuantity = (e) => {
    this.setState({
      quantity: e.target.value
    })
    this.calculTaxes(e.target.value * 52)
  };

  calculTaxes = (price) => {
    const withTaxes = Math.floor((price * 0.14975)*100)/100
    this.setState({
      taxes: withTaxes
    })
  }

  defineShippingOptions = (e) => {
    console.log(e.target.value)
    this.setState({
      country: e.target.value
    })
    // retrieve all existing shipping methods
    // check for each one of them is the selected coutry is available
    //  display only those ones
    axios.get('http://localhost:3000/shippings')
    .then(response  => {
      const shippingsArray = response.data.filter( data => {
        return data.country === this.state.country
      })
      this.setState({
        shippingOptions: shippingsArray
      })
    })
    .catch(error => {
      console.log(error)
    })

  }

  selectShipping = (e) =>  {
    this.setState({
      shippingFees: parseInt(e.target.value, 10)
    })
  };


  render() {
    return (
      <React.Fragment>
        {!this.state.formIsComplete
          && (
            <React.Fragment>

            <CheckoutForm
              state={this.state}
              setForm={this.handleFormChange}
              setQuantity={this.setQuantity}
              selectShipping={this.selectShipping}
              defaultEmail={this.state.email}
              submitOrder={this.submitOrder}
              defineShippingOptions={this.defineShippingOptions} />
            </React.Fragment>)}

        {this.state.showConfirmation &&
          <Confirmation confirmOrder={this.confirmOrder} state={this.state} /> }
      </React.Fragment>
    );
  }
}

export default OrderForm;
