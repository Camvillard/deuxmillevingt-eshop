import React, {Component} from 'react';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderIsComplete: false,
      emailAddress: this.props.email,
      country: 'Canada',
      pickup: 'colis simple'
    };
  };

  submit = (e)  => {
    e.preventDefault()
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

  handleInputBlur = (e) => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSelectChange = (e) =>  {
    this.setState({
      country:  e.target.value
    })
  };

  handleRadioChange = (e) =>  {
    this.setState({
      pickup: e.target.value
    })
  };

  sendOrder = (e) => {
    e.preventDefault()
    console.log(this.state)
  };

  render() {
    return (
      <div className="checkout">

        <input type="number" placeholder="3" onChange={this.setQuantity}/>

        <form action="" onSubmit={this.sendOrder}>

          <input
            type="text"
            name="name"
            placeholder="nom, prénom"
            onBlur={this.handleInputBlur}/>

          <input
            type="email"
            name="email"
            placeholder="adresse email"
            defaultValue={this.props.email}
            onBlur={this.handleInputBlur}/>

          <input
            type="text"
            name="address"
            placeholder="adresse"
            onBlur={this.handleInputBlur}/>

          <input
            type="text"
            name="zipCode"
            placeholder="code postale"
            onBlur={this.handleInputBlur}/>

          <input
            type="text"
            name="city"
            placeholder="ville"
            onBlur={this.handleInputBlur}/>

          <select name="country" id="country" onChange={this.handleSelectChange}>
            <option value="Canada">Canada</option>
            <option value="US">US</option>
            <option value="other">reste du monde</option>
          </select>

          <div className="form-group">
            <input type="radio" id="colis-simple" name="livraison" value="colis-simple" onChange={this.handleRadioChange} />
            <label htmlFor="colis-simple">colis simple</label>

            <input type="radio" id="colis-suivi" name="livraison" value="colis-suivi" onChange={this.handleRadioChange} />
            <label htmlFor="colis-suivi">colis suivi</label>

            <input type="radio" id="pickup" name="livraison" value="pickup" onChange={this.handleRadioChange} />
            <label htmlFor="pickup">ramassage en boutique</label>
          </div>

          <button>pré-commander</button>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
