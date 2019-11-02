import React from 'react';


class SplashPage extends React.Component {

  render() {
    const { initiateUser } = this.props
    return (
      <div className="splash-page">
          <p onClick={initiateUser}>pré commander</p>
      </div>
    )
  }
}
export default SplashPage;
