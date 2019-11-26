// external stuff
import React, {Fragment} from 'react';
import axios from "axios";
import { Elements, StripeProvider } from 'react-stripe-elements';

//  components
import OrderForm from "./components/order-form"
// import Payment from "./components/payment"
import Confirmation from "./components/confirmation";
import SplashPage from "./components/splash-page";
import DetailsPage from "./components/details-page";

//  assets & style
// import logo from './logo.svg';
import './styles/main.scss';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initiateUser: true,
      showDetails: false,
      showOrderForm: false,
      showConfirmation: false,
      orderIsConfirmed: false,
      email: '',
      country: '',
      shippingOptions: [],
      quantity: 0,
      totalAmount: 0,
      taxes: 0
    }
  };

  initiateUser = (e) => {
    this.setState({
      initiateUser: false,
      showDetails: true
    })
  };

  showDetails = (e) => {
    this.setState({
      showDetails: false,
      showOrderForm: true
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
    axios.get(`https://deuxmillevingt-data.herokuapp.com/shippings`)
    .then(response  => {
      const shippingsArray = response.data.filter( data =>
        data.country === this.state.country
      )
      this.setState({
        shippingOptions: shippingsArray
      })
    })
    .catch(error => {
      alert(error)
    })
  };

  selectShipping = (e) =>  {
    const { quantity } = this.state
    axios({
      method: 'get',
      url: `https://deuxmillevingt-data.herokuapp.com/shippings/${e.target.id}`
    })
    .then( response => {
      const selectedShipping = response.data
      const price = quantity * 50
      this.setState({
        selectedShipping
      })
    this.calculTaxes(price, selectedShipping.price_cents/100)
    })
  };

  calculTaxes = (price, shipping = 0) => {
    const withTaxes = Math.ceil(((price + shipping) * 0.14975)*100)/100
    this.setState({
      taxes: withTaxes
    })
  };

  setQuantity = (e) => {
    const quantity = e
    this.setState({
      quantity
    })
    this.calculTaxes(quantity * 50)
  };

  submitOrder = (e)  => {
    e.preventDefault()
    if (this.state.name && this.state.address && this.state.zipCode) {
      const {quantity, taxes, selectedShipping } = this.state
      const amount = Math.ceil((quantity * 50 + taxes + (selectedShipping.price_cents/100))*100)/100
      this.setState({
        initiateUser: false,
        showOrderForm: false,
        showConfirmation: true,
        totalAmount: amount
      })
      this.createUser()
    } else {
      alert('missing something')
    }
  };

  createUser = () => {
    axios.post('https://deuxmillevingt-data.herokuapp.com/users', {
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
      this.setState({
        ...this.state,
        userId
      })
    })
    .catch(error => {
        console.log(error)
    })
  }



  render(){
    return(

      <Fragment>

      {this.state.initiateUser && <SplashPage initiateUser={this.initiateUser} />}
      {this.state.showDetails && <DetailsPage showDetails={this.showDetails} />}

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
          (<StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
            <Elements>
              <Confirmation
                 state={this.state}/>
            </Elements>
          </StripeProvider>
          )
         }

      </Fragment>

    )
  }
}


export default App;
