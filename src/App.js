// external stuff
import React from 'react';
import axios from "axios";

//  components
import Product from "./components/product"
import CheckoutForm from "./components/checkout-form"

//  assets & style
// import logo from './logo.svg';
import './styles/main.scss';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderIsInitiated: false,
      numberofItems: 0,
      pickupMethod: '',
      emailAddress: ''
    }
  };

  handleInputBlur = (e) => {
    console.log(e)
    this.setState({
      orderIsInitiated: true,
      emailAddress: e.target.value
    })
    this.initiateUser(e.target.value)
  };


  initiateUser = (emailAddress) => {
    // calling the API to create a user
    // that is gonna be used to create the order
    axios.post('http://localhost:3000/users', {
      user: {
        email: emailAddress
      }
    })
    .then(response => {
      console.log('response : ', response)
    })
    .catch(error => {
        console.log(error)
    })
  }


  render(){
    return(
      <div>
        <input type="email" onBlur={this.handleInputBlur} placeholder="addresse email"/>
        {this.state.orderIsInitiated  && <CheckoutForm email={this.state.emailAddress} /> }

      </div>

    )
  }
}


export default App;
