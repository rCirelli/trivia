import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history, assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        {
          assertions < MIN_ASSERTIONS
            ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1>
        }
        <div>
          <h1 data-testid="feedback-total-score">{ score }</h1>
          <h1 data-testid="feedback-total-question">{ assertions }</h1>
        </div>

        <button
        // Requisito 16
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>

        <button
          // Requisito 15
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
