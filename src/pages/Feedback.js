import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
      <h1>Hello</h1>
      
      <button
        //Requisito 16
        type='button'
        onClick={ () => history.push('/ranking')}
        data-testid='btn-ranking'
      >
        Ranking
      </button>
      
      <button
      // Requisito 15
        type='button'
        onClick={ () => history.push('/')}
        data-testid='btn-play-again'
      >
        Play Again
      </button>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};