import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Header from '../components/Header';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  hashEmail = (email) => md5(email).toString();

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        {
          ranking && ranking.sort((a, b) => b.score - a.score).map((rank, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${this.hashEmail(rank.picture)}` }
                width={ 50 }
                alt="profile"
                data-testid="header-profile-picture"
              />
              <p data-testid={ `player-name-${index}` }>{rank.name}</p>
              <p data-testid={ `player-score-${index}` }>{rank.score}</p>
            </div>
          ))
        }
        <button
          // Requisito 16
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
