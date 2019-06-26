import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false
    }
    this.startTimer.bind(this)()
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  componentDidUpdate() {
    if (this.props.timerEnd) {
      this.stopTimer();
    }
  }
  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState, props) => {
        return { time: prevState.time + 1 };
      })
    }, 1000)


  }
  stopTimer() {
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({ time: 0 })
  }
  secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60);   //Get remaining minutes
    s -= m * 60;
    return h + 'h:' + (m < 10 ? m + 'm' : m + 'm') + ":" + (s < 10 ? s + 's' : s + 's'); //zero padding on minutes and seconds
  }
  render() {
    return (
      <div>
        <h3>timer: {this.secondsTimeSpanToHMS(this.state.time)}</h3>
      </div>
    )
  }
}
