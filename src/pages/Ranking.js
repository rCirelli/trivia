import React, { Component } from 'react';
import Header from '../components/Header';
import PropTypes from 'prop-types';

class Ranking extends Component {
 
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1
        //Requisito 16
        data-testid='ranking-title'
        >Ranking</h1>
      <Header
      // Requisito 12
      />
      <button
      //Requisito 16
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