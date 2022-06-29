import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  state = { counter: 30, timerId: 0 };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const timerId = setInterval(() => {
      this.setState((prev) => ({
        counter: prev.counter - 1,
      }));
    }, ONE_SECOND);
    this.setState({ timerId });
  }

  componentDidUpdate() {
    this.setTimer();
  }

  setTimer = () => {
    const { counter, timerId } = this.state;
    const { timerOff } = this.props;
    if (counter === 0 && timerId !== '') {
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
};

export default Timer;
