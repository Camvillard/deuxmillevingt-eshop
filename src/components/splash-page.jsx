import React from 'react';


class SplashPage extends React.Component {

  render() {
    const { initiateUser } = this.props
    return (
      <div className="splash-page grid lg-12-columns page">
        <div className="column is-one lg-is-six image-column">
          <img src="https://res.cloudinary.com/camvillard/image/upload/v1574703095/calendrier/calendrier-2020_3.jpg" alt="calendar"/>
          <div className="badge small blue"><p>50$</p></div>
        </div>
        <div className="column is-one lg-is-six description-column">
          <div className="calendar-title-box">
            <h1>maxi calendrier</h1>
            <h3>deux mille vingt</h3>
          </div>
          <span onClick={initiateUser} className="button button-left-border">découvrir le calendrier</span>
        </div>
      </div>
    )
  }
}
export default SplashPage;
