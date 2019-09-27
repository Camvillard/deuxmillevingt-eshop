import React, {Component} from 'react';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
  }

  submit = (e)  => {
    axios.post('http://localhost:3000/products', {
      product: {
        name: 'test',
        description: 'test description',
        price: 56
      }
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })

  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <button onClick={this.submit}>acheter</button>
      </div>
    );
  }
}

export default CheckoutForm;
