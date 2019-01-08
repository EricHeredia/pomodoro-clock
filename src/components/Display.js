import React, { Component } from 'react'
import './Display.css'

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let minDisplay = () => {
      return this.props.curLength < 10 ? (
        '0' + String(this.props.curLength)
        ) : (
          this.props.curLength
        )
    }
    let secDisplay = () => {
      return this.props.curSeconds < 10 ? (
        '0' + String(this.props.curSeconds)
        ) : (
          this.props.curSeconds
        )
    }
    let fullDisplay = () => {
      return minDisplay() + ':' + secDisplay()
    }

    const warnStyle = {
      color: 'red'
    }

    return (
      <div id={this.props.id} className="display">
        
        <p onClick={this.playBeep} id={this.props.timerLabel}>{this.props.onBreak ? 'Break':'Session'}</p>
        
        <p
          id={this.props.timeLeft}
          style={minDisplay() === '00' ? warnStyle:null}
        >
        {fullDisplay()}
        </p>
        
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"
        />

      </div>
    )
  }
}

export default Display