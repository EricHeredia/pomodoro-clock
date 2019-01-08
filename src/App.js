import React, { Component } from 'react';
import './App.css';
import TimeSettings from './components/TimeSettings'
import Display from './components/Display'
import Controller from './components/Controller'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      curLength: 25,
      curSeconds: 0,
      timerState: 'stopped',
      intervalID: '',
      onBreak: false
    }
  }

  handleClick = (e) => {
    const id = e.target.id
    switch (id) {
      case 'break-increment':
        this.lengthIncDec(e)
        break
      case 'break-decrement':
        this.lengthIncDec(e)
        break
      case 'session-increment':
        this.lengthIncDec(e)
        break
      case 'session-decrement':
        this.lengthIncDec(e)
        break
      case 'start':
      case 'stop':
      case 'start_stop':
        this.timerControl()
        break
      case 'reset':
        this.resetClock()
        break
      default:
        break
    }
  }

  timerControl = () => {
    return this.state.timerState === 'stopped' ? (
      this.timerStart(),
      this.setState({timerState: 'running'})
    ) : (
      this.setState({timerState: 'stopped'}),
      this.state.intervalID && this.state.intervalID.clear()
    )
  }

  timerStart = (prevState) => {
    const accurateInterval = require('accurate-interval')
    this.setState({
      intervalID: accurateInterval(()=> {
        if (this.state.curLength === 0 && this.state.curSeconds === 0) {
          this.playBeep('play')
        }
        this.decTime()
      }, 1000)
    })
  }

  decTime = () => {
    const {onBreak} = this.state
    const {curLength} = this.state
    const {curSeconds} = this.state
    if (curLength > 0) {
      if (curSeconds > 0) {
        this.setState({curSeconds: curSeconds - 1})
      } else {
        this.setState({
          curLength: curLength - 1,
          curSeconds: 59
        })
      }
    } else {
      if (curSeconds > 0) {
        this.setState({
          curSeconds: curSeconds - 1
        })
      } else {
        this.setState({
          onBreak: !onBreak,
          curLength: !onBreak ? (
            this.state.breakLength
          ):(
            this.state.sessionLength
          )
        })
      }
    }
  }

  lengthIncDec = (e) => {
    const button = e.target.getAttribute('id').split('-')
    if (this.state.timerState === 'stopped') {
      if (button[0] === 'break') {
        if (button[1] === 'increment' && this.state.breakLength <= 60) {
          if (this.state.breakLength !== 60) {
            this.setState({
              breakLength: this.state.breakLength + 1
            })
          }
        } else {
          if (this.state.breakLength >= 2) {
            this.setState({
              breakLength: this.state.breakLength - 1
            })
          }
        }
      } else {
        if (button[1] === 'increment' && this.state.breakLength <= 60) {
          if (this.state.sessionLength !== 60) {
            this.setState({
              sessionLength: this.state.sessionLength + 1,
              curLength: this.state.curLength + 1
            })
          }
        } else {
          if (this.state.sessionLength >= 2) {
            this.setState({
              sessionLength: this.state.sessionLength - 1,
              curLength: this.state.curLength - 1
            })
          }
        }
      }
    }
  }

  resetClock = () => {
    this.state.intervalID && this.state.intervalID.clear()
    this.playBeep('stop')
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      curLength: 25,
      timerState: 'stopped',
      intervalID: '',
      onBreak: false,
      curSeconds: 0
    })
  }

  playBeep = (action) => {
    const beep = document.getElementById('beep')
    if (action === 'play') {
      beep.currentTime = 0
      beep.play()
    } else if (action === 'stop') {
      beep.currentTime = 0
      beep.pause()
    }
  }

  render() {
    return (
      <div className="App">

        <h1>Pomodoro Clock</h1>

        <TimeSettings
          id="session-settings"
          label="session-label"
          text="Session Length"
          decrement="session-decrement"
          length="session-length"
          increment="session-increment"
          lengthDisplay={this.state.sessionLength}
          handleClickCB={this.handleClick}
        />

        <TimeSettings 
          id="break-settings"
          label="break-label"
          text="break Length"
          decrement="break-decrement"
          length="break-length"
          increment="break-increment"
          lengthDisplay={this.state.breakLength}
          handleClickCB={this.handleClick}
        />

        <Display 
          id="display"
          timerLabel="timer-label"
          timeLeft="time-left"
          onBreak={this.state.onBreak}
          curLength={this.state.curLength}
          curSeconds={this.state.curSeconds}
        />

        <Controller
          handleClickCB={this.handleClick}
          timerControlCB={this.timerControl}
        />
        
      </div>
    );
  }
}

export default App;
