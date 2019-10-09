// external stuff
import React from 'react';
import axios from "axios";

//  components
import OrderForm from "./components/order-form"
import CheckoutForm from "./components/checkout-form";
import Confirmation from "./components/confirmation"

//  assets & style
// import logo from './logo.svg';
import './styles/main.scss';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initiateUser: true,
      orderIsInitiated: false,
      formIsComplete: false,
      showConfirmation: false,
      orderIsConfirmed: false,
      orderIsPaid: false,
      email: '',
      country: '',
      shippingFees: 0,
      shippingOptions: [],
      quantity: 0,
      totalAmount: 0,
      taxes: 0,
      calendarPrice: 52
    }
  };

  initiateUser = (e) => {
    this.setState({
      orderIsInitiated: true,
      email: e.target.value
    })
  };

   handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

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
  };

  selectShipping = (e) =>  {
    this.setState({
      shippingFees: parseInt(e.target.value, 10)
    })
  };

  calculTaxes = (price) => {
    const withTaxes = Math.floor((price * 0.14975)*100)/100
    this.setState({
      taxes: withTaxes
    })
  };

  setQuantity = (e) => {
    this.setState({
      quantity: e.target.value
    })
    this.calculTaxes(e.target.value * 52)
  };






  render(){
    return(
      <div>

      {this.state.initiateUser &&
        <input type="email" onBlur={this.initiateUser} placeholder="adresse email"/> }

      {this.state.orderIsInitiated &&
        <OrderForm email={this.state.email} /> }


      </div>

    )
  }
}


export default App;
