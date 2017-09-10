import React, { Component } from "react"
import map from 'lodash/map';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import Blip from 'components/blip';

const width = 640;
const height = 360;

class Map extends Component {
  constructor() {
    super();
    var data = require("./usa-10m.json");
    this.state = {
      selectedBlip: null,
      usaData: feature(data, data.objects.states).features
    }
  }

  pathGenerator() {
    const projection = geoAlbersUsa()
      .translate([ width / 2, height / 2 ])
      .scale(800);
    return geoPath(projection);
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <svg width={ width } height={ height } viewBox={`0 0 ${width} ${height}`}>
          <g> // MAP OF THE USA
            {
              this.state.usaData.map((d,i) => (
                <path
                  key={ `path-${ i }` }
                  d={ this.pathGenerator()(d) }
                  fill={ `rgba(38,50,56,${(1 / this.state.usaData.length * i - 0.5)/20+0.5})` }
                  stroke="#FFFFFF"
                  strokeWidth={ 0.5 }
                />
              ))
            }
          </g>
          <g> // BLIPS
            {
              map(this.props.blips, (blip, blipName) => (
                <ReactCSSTransitionGroup
                  key={blipName}
                  transitionName="blipAnims"
                  transitionEnterTimeout={1000}
                  transitionLeaveTimeout={1000}
                >
                  <Blip
                    blip={blip}
                    blipName={blipName}
                    pathGenerator={this.pathGenerator}
                    onClick={this.props.onClick}
                    active={blipName === this.props.selectedBlip}
                  />
                </ReactCSSTransitionGroup>
              ))
            }
          </g>
        </svg>
      </div>
    )
  }
}

export default Map;
