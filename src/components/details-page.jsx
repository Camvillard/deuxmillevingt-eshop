import React from 'react';


class DetailsPage extends React.Component {

  render() {
    const { showDetails } = this.props
    return (
      <div className="details-page page">
        <div className="grid lg-12-columns">
          <div className="column is-one lg-is-six image-column sticky-top">
            <img src="https://res.cloudinary.com/camvillard/image/upload/v1574703096/calendrier/calendrier-2020_4.jpg" alt="calendar"/>
            <div className="badge small blue"><p>50$</p></div>
          </div>
          <div className="column is-one lg-is-six details-column">
            <h1>
              le maxi calendrier :
            </h1>
            <p>
              de janvier à décembre, avec un petit coin pour glisser toutes les notes du mois & un aperçu du mois suivant.
            </p>
            <p>24’ x 32’ (environ 60 x 80 cm)</p>
            <p>imprimé sur un papier blanc lisse ; quatorze feuilles brochées, le tout perforé pour pouvoir être accroché au mur facilement.</p>
            <p>attention, le calendrier est en pré-commande : les expéditions se feront aux alentours du 15 décembre. vous serez bien sûr averti(e)s par mail, parce que bon, c’est quand même pas cool autrement.</p>
            <p><span onClick={showDetails} className="button button-left-border">pré-commander</span></p>
          </div>
        </div>

      </div>
    )
  }
}
export default DetailsPage;
