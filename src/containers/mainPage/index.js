import React, { Component } from 'react';
import './index.css';

// import BarChart from './BarChart.js';
import Map from './map.js';
import MapControl from './mapControl.js';

class MainPage extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <h style={{marginTop: "10px", marginBottom: "30px"}}>Blip</h>
          <Map />
        </div>
      </div>
    );
  }
}

export default MainPage;
