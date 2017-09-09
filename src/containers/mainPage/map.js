import React, { Component } from "react"
import { connect } from 'react-redux';
import { getBlips } from 'actions/index';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import { Button, Icon } from 'antd';
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";

import TweetWall from './tweetWall';

const width = 640;
const height = 360;

class Map extends Component {

  constructor() {
    super();
    var data = require("./usa-10m.json");

    this.state = {
      usaData: feature(data, data.objects.states).features,
      blips: { },
      selectedBlip: null,
    }

    this.toggleHover = this.toggleHover.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleHover(name) {
    let newState = this.state;
    this.state.blips[name].hover = !this.state.blips[name].hover;
    this.setState(newState);
  }

  toggleActive(name) {
    let newState = this.state;
    this.state.blips[name].active = !this.state.blips[name].active;
    this.setState({ ...newState, ["selectedBlip"]: name });
  }

  projection() {
    return geoAlbersUsa()
      .translate([ width / 2, height / 2 ])
      .scale(800);
  }

  componentWillMount() {
    this.props.getBlips();
    
    this.setState({
      ...this.state,
      ["blips"]: this.props.blips
    })

    setInterval(() => {
      let newBlips = reduce(this.state.blips, (res, val, key) => {
        if (Math.random() > 0.8) {
          val.heat = Math.random() * 50 + 15;
        }
        res[key] = val;
        return res;
      }, {});
      this.setState({
        ...this.state,
        ["blips"]: newBlips
      });
    }, 500);
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <svg width={ width } height={ height } viewBox={`0 0 ${width} ${height}`}>
          <g className="usa">
            {
              this.state.usaData.map((d,i) => (
                <path
                  key={ `path-${ i }` }
                  d={ geoPath(this.projection())(d) }
                  fill={ `rgba(38,50,56,${(1 / this.state.usaData.length * i - 0.5)/20+0.5})` }
                  stroke="#FFFFFF"
                  strokeWidth={ 0.5 }
                />
              ))
            }
          </g>
          <g>
            {
              map(this.state.blips, (blip, blipName) => {
                const path = geoPath(this.projection())({
                  "type": "Point",
                  "coordinates": [blip.lng,blip.lat]
                });
                const path_arr = path.split(',');
                let { hover, active } = blip;
                active = active && blipName === this.state.selectedBlip;
                const r = active ? 100 : (Math.min(Math.max(blip.heat, 15), 80) * (hover ? 1.2 : 1.0)) * (Math.max(0.3, 1.0 - Object.keys(this.state.blips).length / 300));
                const corner = active ? 0 : r/2;
                const cx = parseFloat(path_arr[0].substring(1)) - r/2;
                const cy = parseFloat(path_arr[1].substring(0, path_arr[1].length - 5)) - r/2;
                let color;
                if (active) {
                  color = 'rgba(255, 255, 160, 0.9)';
                }
                else if (blip.positive) {
                  color = `rgba(80, 150, ${Math.floor(blip.heat) + 175}, ${hover ? 0.9:0.6})`;
                }
                else {
                  color = `rgba(${Math.floor(blip.heat) + 175}, 80, 150, ${hover ? 0.9:0.6})`;
                }
                return (
                  <g key={`blip-${blipName}`}
                    onMouseEnter={() => this.toggleHover(blipName)}
                    onMouseLeave={() => this.toggleHover(blipName)}
                    onClick={() => this.toggleActive(blipName)}
                    className={`blip ${ hover ? "bliphover":""}`}
                  >
                    <rect
                      className={`blip ${ hover ? "bliphover":""}`}
                      x={cx}
                      y={cy}
                      rx={corner}
                      ry={corner}
                      width={r}
                      height={r}
                      fill={color}
                      stroke={'rgb(0, 0, 0)'}
                      strokeWidth={ 0.5 }
                    />
                    <text x={cx + r/2} y={cy + r/2 + 3} fontFamily="Arial" fontSize="12" textAnchor="middle"
                      pointerEvents="none" className={active ? 'blipTextActive' : 'blipText'}>
                      {blipName}
                    </text>
                  </g>
                )
              })
            }
          </g>
        </svg>
        <Button type="primary" shape="circle" icon="reload" size="large"
          onClick={() => {
            console.log(JSON.stringify(this.state.blips));
            this.setState({
              ...this.state,
              ["blips"]: {
                ...this.state.blips, ["location"+Math.random()]: {
                  lat: 34.400455 + Math.floor(Math.random() * 8),
                  lng: -85.933278 - Math.floor(Math.random() * 30),
                  heat: 15 + Math.floor(Math.random() * 40),
                  hover: false,
                  active: false,
                  positive: Math.random() > 0.5
                }
              }
            })
          }}
        />
        <TweetWall selectedBlip={this.state.selectedBlip}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    blips: state.blips.blips
  }
}

export default connect(mapStateToProps, { getBlips })(Map);
