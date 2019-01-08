import React, { Component } from 'react'
import './TimeSettings.css'

class TimeSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id={this.props.id} className="time-settings">
        <h2 id={this.props.label}>{this.props.text}</h2>
        
        <button
          id={this.props.decrement}
          onClick={this.props.handleClickCB}
          className="fas fa-chevron-down"
        ></button>
        
        <p id={this.props.length}>{this.props.lengthDisplay}</p>
        
        <button
          id={this.props.increment}
          onClick={this.props.handleClickCB}
          className="fas fa-chevron-up"
        ></button>
      </div>
    )
  }
}

export default TimeSettings