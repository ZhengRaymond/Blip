import React, { Component } from "react"
import './index.css';

class MapControl extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <div className="control-form">
        <h>Control Panel</h>
        <button className="control-submit">Submit</button>
      </div>
    )
  }
}

export default MapControl;
