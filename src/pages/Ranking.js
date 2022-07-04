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
      <div className="flex flex-col justify-center items-center p-10">
        <h1
          className="text-4xl font-bold mb-10 text-violet-100"
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <div
          className="flex flex-col bg-violet-100 max-w-2xl p-10
          rounded-lg gap-5 shadow-lg mb-10"
        >
          {
            ranking && ranking.sort((a, b) => b.score - a.score).map((rank, index) => (
              <div
                className="bg-[#07DBAC] rounded-lg p-5 flex items-center gap-5
                shadow-lg max-w-sm"
                key={ index }
              >
                <img
                  className="rounded-md"
                  src={ `https://www.gravatar.com/avatar/${this.hashEmail(rank.picture)}` }
                  width={ 50 }
                  alt="profile"
                  data-testid="header-profile-picture"
                />
                <span
                  className="flex flex-col"
                >
                  <p
                    className="font-medium"
                    data-testid={ `player-name-${index}` }
                  >
                    {rank.name}
                  </p>
                  <p
                    className="italic"
                    data-testid={ `player-score-${index}` }
                  >
                    {`Score: ${rank.score}`}
                  </p>
                </span>
              </div>
            ))
          }
        </div>
        <button
          // Requisito 16
          className="p-2 py-3 w-full rounded-lg bg-[#07DBAC] text-violet-900 font-bold
          text-lg hover:bg-teal-500 max-w-md"
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
