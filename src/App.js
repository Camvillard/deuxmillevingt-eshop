// external stuff
import React from 'react';
import axios from "axios";

//  components
import OrderForm from "./components/order-form"
import Confirmation from "./components/confirmation"

//  assets & style
// import logo from './logo.svg';
import './styles/main.scss';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderIsInitiated: false,
      email: '',
      userId: null
    }
  };

  handleInputBlur = (e) => {
    this.setState({
      orderIsInitiated: true,
      email: e.target.value
    })
    this.initiateUser(e.target.value)
  };

  initiateUser = (email) => {
    // calling the API to create a user
    // that is gonna be used to create the order
    axios.post('http://localhost:3000/users', {
      user: {
        email: email
      }
    })
    .then(response => {
      // console.log('response : ', response)
      this.setState({
        userId: response.data.id
      })
    })
    .catch(error => {
        console.log(error)
    })
  };


  render(){
    return(
      <div>
        <input type="email" onBlur={this.handleInputBlur} placeholder="adresse email"/>
        {this.state.orderIsInitiated  && <OrderForm email={this.state.email} userId={this.state.userId} /> }
      </div>

    )
  }
}


export default App;
