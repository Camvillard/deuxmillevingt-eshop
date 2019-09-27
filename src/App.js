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
    axios.post('http://localhost:3000/users', {
      user: {
        email: e.target.value
      }
    })
    .then(response => {
        console.log('response', response)
    })
    .catch(error => {
        console.log(error)
    })

  };

  render(){
    return(
      <div>
        <input type="email" onBlur={this.handleInputBlur} placeholder="addresse email"/>
        {this.state.orderIsInitiated  && <CheckoutForm /> }

      </div>

    )
  }
}


export default App;
