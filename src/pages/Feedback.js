import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Header from '../components/Header';
// import { clearScore } from '../redux/actions';

class Feedback extends Component {
  state = {
    assertions: 0,
    score: 0,
  }

  componentDidMount() {
    const { assertions, score } = this.props;
    this.setState({ assertions, score });
    // dispatch(clearScore());
  }

  render() {
    const { history } = this.props;
    const { assertions, score } = this.state;
    const MIN_ASSERTIONS = 3;
    return (
      <div className="flex flex-col justify-center h-screen">
        {/* <Header /> */}
        <div
          className="self-center flex flex-col justify-center items-center
          bg-[#07DBAC] max-w-2xl px-20 pt-14 pb-12 rounded-lg gap-10 shadow-lg"
        >
          {
            assertions < MIN_ASSERTIONS
              ? (
                <h1
                  data-testid="feedback-text"
                  className="text-5xl font-semibold italic"
                >
                  Could be better...
                </h1>)
              : (
                <h1
                  data-testid="feedback-text"
                  className="text-5xl font-semibold italic"
                >
                  Well Done!
                </h1>)
          }
          <div className="flex flex-col gap-5 items-center">
            <span className="flex gap-2 text-3xl">
              Score:
              <p data-testid="feedback-total-score">{ score }</p>
            </span>
            <span className="flex gap-2 text-lg">
              Correct Answers:
              <p data-testid="feedback-total-question">{ assertions }</p>
            </span>
          </div>
          <button
          // Requisito 16
            className="p-2 w-full rounded-lg bg-violet-700 text-violet-200 font-bold
            hover:bg-violet-600"
            type="button"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
          <button
            // Requisito 15
            className="p-2 w-full rounded-lg bg-violet-700 text-violet-200 font-bold
            hover:bg-violet-600"
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </div>
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
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
