import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // headerStyle = {
  //   border: '1px solid black',
  //   padding: '20px 25px',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // };

  hashEmail = (email) => md5(email).toString();

  render() {
    const { player } = this.props;

    return (
      <header
        className="flex pr-5 justify-between items-center bg-[#3B254F]"
      >
        <div
          className="flex items-center"
        >
          <img
            src={ `https://www.gravatar.com/avatar/${this.hashEmail(player.gravatarEmail)}` }
            width={ 70 }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ player.name }</span>
        </div>
        <div
          className="text-purple-100"
        >
          <span>Score: </span>
          <span
            data-testid="header-score"
          >
            { player.score }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
