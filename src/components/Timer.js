import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
  state = {
    counter: 0,
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
      clearInterval(timerId);
      this.setState({ timerId: '' });
      timerOff();
    }
  }

  checkTimer = () => {
    const { timerId } = this.state;
    const { isPaused } = this.props;
    console.log('timer', timerId);
    return timerId === '' || isPaused ? '' : 'animate-ping';
  }

  render() {
    const { counter } = this.state;
    return (
      <div
        className="rounded-full border border-violet-500 h-[50px] w-[50px]
        flex justify-center items-center p-5"
      >
        <p
          className={ `text-xl font-bold text-violet-200 ${this.checkTimer()}` }
          data-testid="timer-header"
        >
          { counter }
        </p>
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
