import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';

// import BarChart from './BarChart.js';
import Map from './map.js';
import MapControl from './mapControl.js';

class MainPage extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <h>Blip</h>
          <div className="map">
            <div style={{display: "none"}}><MapControl /></div>
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(MainPage);
