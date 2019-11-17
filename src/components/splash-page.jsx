import React from 'react';


class SplashPage extends React.Component {

  render() {
    const { initiateUser } = this.props
    return (
      <div className="splash-page grid lg-12-columns page">
        <div className="column is-one lg-is-six image-column">
          <img src="https://images.unsplash.com/photo-1543168256-4ae2229821f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3168&q=80" alt="calendar"/>
          <div className="badge small blue"><p>50$</p></div>
        </div>
        <div className="column is-one lg-is-six description-column">
          <h1>maxi calendrier</h1>
          <h3>
            calendrier 2020
          </h3>
          <p>
            de janvier à décembre, avec un petit coin pour glisser toutes les notes du mois & un aperçu du mois suivant.
          </p>
          <p>24’ x 32’ (environ 60 x 80 cm)</p>
          <p>imprimé sur un papier blanc lisse. quatorze feuilles brochées, le tout perforé pour pouvoir être accroché au mur facilement.</p>
          <p>attention, le calendrier est en pré-commande : les expéditions se feront aux alentours du 10 décembre. vous serez bien sûr averti(e)s par mail, parce que bon, c’est quand même pas cool autrement.</p>
          <p>
          <span onClick={initiateUser} className="button button-left-border">pré commander</span>
          </p>
        </div>
      </div>
    )
  }
}
export default SplashPage;
