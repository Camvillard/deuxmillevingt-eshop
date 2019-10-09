import React, {Component} from 'react';
import axios from 'axios';

class Confirmation extends Component {

  sendOrder = (e) => {
    e.preventDefault()
    // console.log(this.state)
  };

  render() {
    console.log(this.props)
    return (
      <div className="confirmation-page">
        <p onClick={this.props.confirmOrder}>confirmer</p>
      </div>
    );
  }
}

export default Confirmation;
