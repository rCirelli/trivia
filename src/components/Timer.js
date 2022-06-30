import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
  state = {
    counter: 30,
    timerId: 0,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { isPaused, isNext, resetNext, setTimerStop } = this.props;
    const { timerId, counter } = this.state;
    if (!isPaused) {
      this.setTimer();
    } else {
      // dispatch(timerResponse({ timerResponse: counter }));
      setTimerStop(counter);
      clearInterval(timerId);
    }
    if (isNext) {
      this.startTimer();
      resetNext();
    }
  }

  startTimer = () => {
    this.setState({ counter: 30 });
    const ONE_SECOND = 1000;
    const timerId = setInterval(() => {
      this.setState((prev) => ({ counter: prev.counter - 1 }));
    }, ONE_SECOND);
    this.setState({ timerId });
  }

  setTimer = () => {
    const { counter, timerId } = this.state;
    const { timerOff } = this.props;
    if ((counter === 0 && timerId !== '')) {
      console.log('setTimer');
      clearInterval(timerId);
      this.setState({ timerId: '' });
      timerOff();
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <span>
          TIMER:
          { counter }
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  timerOff: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  setTimerStop: PropTypes.func.isRequired,
  isNext: PropTypes.bool.isRequired,
  resetNext: PropTypes.func.isRequired,
};

export default connect()(Timer);
