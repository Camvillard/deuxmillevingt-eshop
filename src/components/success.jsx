// external librairies
import React, {Component} from 'react';

// internal components
// styles & assets

class Success extends Component {

  render() {
    return(
      <div className="success-page page">
        <div className="page-content">
          <h2>merci !</h2>
          <p>une confirmation de commande va être envoyée au <span className="email">{this.props.email}</span> .</p>
          <p>tous les envois seront effectués aux alentours du 15 décembre, une notification sera envoyée à ce moment-là.</p>
          <p>pour toute réclamation, information ou autre besoin de communiquer : <span className="email">salut@cdltbisou.com</span> .</p>
        </div>
      </div>
    )
  }
}

export default Success;
