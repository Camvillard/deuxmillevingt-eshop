import React, {Component} from 'react';
import axios from 'axios';

class Confirmation extends Component {

  sendOrder = (e) => {
    e.preventDefault()
    // console.log(this.state)
  };

  render() {
    return (
      <div className="confirmation">
        <p onClick={this.props.confirmOrder}>confirmer</p>
      </div>
    );
  }
}

export default Confirmation;
