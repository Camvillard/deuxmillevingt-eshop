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
      showOrderForm: false,
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
      initiateUser: false,
      showOrderForm: true,
      email: e.target.value
    })
  };

   handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  defineShippingOptions = (e) => {
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
    const shippingMethod = e.target.id.substring(9)
    this.setState({
      shippingMethod,
      shippingFees: parseInt(e.target.value, 10)
    })
    this.calculTaxes({qty: this.state.quantity * 50, ship: parseInt(e.target.value, 10)})
  };

  calculTaxes = ({qty, ship}) => {
    const calendar = qty
    const shipping = ship
    console.log('taxes', calendar, shipping)
    const withTaxes = Math.ceil(((calendar + shipping) * 0.14975)*100)/100
    this.setState({
      taxes: withTaxes
    })
  };

  setQuantity = (e) => {
    this.setState({
      quantity: e.target.value
    })
    this.calculTaxes({qty: e.target.value * 50, ship: this.state.shippingFees})
  };

   confirmOrder = () => {
    console.log('confirm')
    console.log(this.state)
    this.setState({
      orderIsConfirmed: true
    })
    this.sendOrderToBackOffice(this.state)
  };

    // t.string "name"
    // t.string "address"
    // t.string "zip_code"
    // t.string "country"
    // t.string "city"
    // t.string "email"

  sendOrderToBackOffice = (state) => {
    //  creating a user with the email address
    axios.post('http://localhost:3001/users', {
      name: this.state.name,
      address: this.state.address,
      zip_code: this.state.zipCode,
      country: this.state.country,
      city: this.state.city,
      email: this.state.email
    })
    .then(response => {
      const userId = response.data.id
      //creating an order object
      axios.post('http://localhost:3001/orders', {
        order: {
          price_cents: this.state.totalAmount,
          shipping_id: parseInt(this.state.shippingMethod, 10),
          user_id: userId
        }
      })
      .then(response => {
          console.log('response', response)
      })
      .catch(error => {
          console.log(error)
      })
    })
    .catch(error => {
        console.log(error)
    })
  }

  submitOrder = (e)  => {
    e.preventDefault()

    if (this.state.name && this.state.address && this.state.zipCode) {
      const {quantity, taxes, shippingFees } = this.state
      const amount = Math.ceil((quantity * 50 + taxes + shippingFees)*100)/100
      this.setState({
        initiateUser: false,
        showOrderForm: false,
        showConfirmation: true,
        totalAmount: amount
      })
      console.log('submitted')
    } else {
      alert('missing something')
    }

  };


  render(){
    return(
      <div>

      {this.state.initiateUser &&
        <input type="email" onBlur={this.initiateUser} placeholder="adresse email"/> }

      {this.state.showOrderForm &&
        <OrderForm
          state={this.state}
          setForm={this.handleFormChange}
          setQuantity={this.setQuantity}
          selectShipping={this.selectShipping}
          defaultEmail={this.state.email}
          submitOrder={this.submitOrder}
          defineShippingOptions={this.defineShippingOptions}
        /> }

        {this.state.showConfirmation &&
         <Confirmation
           state={this.state}
           confirmOrder={this.confirmOrder}/> }

      </div>

    )
  }
}


export default App;
