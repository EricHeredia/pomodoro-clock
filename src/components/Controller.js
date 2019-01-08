import React, { Component } from 'react'
import './Controller.css'

class Controller extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="controller">

        <span id="start_stop" onClick={this.props.handleClickCB}>
          <i className="fa fa-play"/>  
          <i className="fa fa-pause"/>
        </span>


        <i
          id="reset"
          className="fa fa-sync-alt"
          onClick={this.props.handleClickCB}
        ></i>
    
      </div>
    )
  }
}

export default Controller