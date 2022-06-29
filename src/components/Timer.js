import React, { Component } from 'react';

class Timer extends Component {
  state = { counter: 30, timerId: 0 };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const timerId = setInterval(() => {
      this.setState((prev) => ({
        counter: prev.counter - 1,
      }))
    }, ONE_SECOND); 
    this.setState({ timerId }); 
  }
 
  componentDidUpdate() {
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
        <span>TIMER: { counter }</span>
      </div>
    );
    }
}
 
export default Timer;