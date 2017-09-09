import React, { Component } from "react"
import { connect } from 'react-redux';
import { getBlips } from 'actions/index';
import _ from 'lodash';

import { geoAlbersUsa, geoMercator, geoPath } from "d3-geo";
import { arc } from "d3-shape";
import { feature } from "topojson-client";
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

const width = 800;
const height = 450;

class Map extends Component {

  constructor() {
    super();
    var data = require("./usa-10m.json");

    this.state = {
      usaData: feature(data, data.objects.states).features,
      blips: {
        "LA event": {
          lng: -118.2437,
          lat: 34.0522,
          heat: 5,
          hover: false
        },
        "NY event": {
          lng: -73.935242,
          lat: 40.730610,
          heat: 5,
          hover: false
        }
      }
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover(name) {
    let newState = this.state;
    this.state.blips[name].hover = !this.state.blips[name].hover;
    this.setState(newState);
  }

  projection() {
    return geoAlbersUsa()
      .translate([ width / 2, height / 2 ])
  }

  componentDidMount() {
    // this.props.getBlips();
  }

  componentDidUpdate() {
    // this.props.getBlips();
  }

  render() {
    return (
      <div>
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
            _.map(this.state.blips, (blip, blipName) => {
              const path = geoPath(this.projection())({
                "type": "Point",
                "coordinates": [blip.lng,blip.lat]
              });
              const path_arr = path.split(',');
              const cx = parseFloat(path_arr[0].substring(1));
              const cy = parseFloat(path_arr[1].substring(0, path_arr[1].length - 5));
              const { hover } = blip;
              return (
                <circle
                  className={`blip ${ hover ? "bliphover":""}`}
                  onMouseEnter={() => this.toggleHover(blipName)}
                  onMouseLeave={() => this.toggleHover(blipName)}
                  key={ `path-${ blipName }` }
                  cx={cx}
                  cy={cy}
                  fill={`rgba(255, 100, 200, ${hover ? 0.9:0.6})`}
                  r={Math.min(Math.max(blip.heat, 8), 50) * (hover ? 1.5 : 1.0)}
                  stroke={'rgb(0, 0, 0)'}
                  strokeWidth={ 0.5 }
                />
              )
            })
          }
        </g>
      </svg>
      <button onClick={() => {
        this.setState(_.reduce(this.state.blips, (res, val, key) => {
          val.heat += 5;
          res[key] = val;
          return res;
        }, {}));
      }}>Click For State!</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    blips: state.blips
  }
}

export default connect(mapStateToProps, { getBlips })(Map);


// import React, { Component } from "react"
// import { connect } from 'react-redux';
// import { getBlips } from 'actions/index';
//
// import { geoAlbersUsa, geoMercator, geoPath } from "d3-geo";
// import { arc } from "d3-shape";
// import { feature } from "topojson-client";
// import { select } from 'd3-selection';
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
//
// const width = 800;
// const height = 450;
//
// class Map extends Component {
//
//   constructor() {
//     super();
//     var data = require("./usa-10m.json");
//
//     // var llprojection = geoAlbersUsa().translate([ width / 2, height / 2 ]);
//     // var newBlips = [];
//     // for (var i = -1000; i < 1000; i += 100) {
//     //   for (var j = -1000; j < 1000; j+= 100) {
//     //     var proj = llprojection([i, j]);
//     //     if (proj) {
//     //       console.log(`[${i}, ${j}]: `, proj);
//     //       newBlips.push({ name: 'asdf', heat: Math.random()*5+10, x: proj[0], y: proj[1]});
//     //     }
//     //   }
//     // }
//
//     this.state = {
//       usaData: feature(data, data.objects.states).features,
//       blips: [ {
//         "type": "Point",
//         "coordinates": [-118.2437, 34.0522]
//       }]
//     };
//
//     this.displayBlips = this.displayBlips.bind(this)
//   }
//
//   displayBlips() {
//     const node = this.node
//     const dataMax = max(this.state.data)
//     const yScale = scaleLinear()
//       .domain([0, dataMax])
//       .range([0, this.props.size[1]])
//
//     select(node)
//       .selectAll('circle')
//       .data(this.state.blips)
//       .enter()
//       .append('circle')
//
//     select(node)
//       .selectAll('circle')
//       .data(this.state.blips)
//       .exit()
//       .remove()
//
//     select(node)
//       .selectAll('circle')
//       .data(this.state.blips)
//       .style('fill', '#fe9922')
//       .attr('cx', d => d.x)
//       .attr('cy', d => d.y)
//       .attr('r', d => d.heat * 50)
//   }
//
//   projection() {
//     return geoAlbersUsa()
//       .translate([ width / 2, height / 2 ])
//   }
//
//   componentDidMount() {
//     // this.props.getBlips();
//   }
//
//   componentDidUpdate() {
//     // this.props.getBlips();
//   }
//
//   render() {
//     console.log("LA: ", geoPath(this.projection())(this.state.blips[0]));
//     return (
//       <div>
//       <svg width={ width } height={ height } viewBox={`0 0 ${width} ${height}`}>
//         <g className="countries">
//           {
//             this.state.usaData.map((d,i) => (
//               <path
//                 key={ `path-${ i }` }
//                 d={ geoPath(this.projection())(d) }
//                 className="country"
//                 fill={ `rgba(38,50,56,${(1 / this.state.usaData.length * i - 0.5)/20+0.5})` }
//                 stroke="#FFFFFF"
//                 strokeWidth={ 0.5 }
//               />
//             ))
//           }
//         </g>
//         <g>
//           {
//             this.state.blips.map((blip,i) => (
//               <path
//                 key={ `path-${ i }` }
//                 d={ geoPath(this.projection())(blip) }
//                 fill="rgba(255, 50, 150, 0.9)"
//                 stroke={'rgb(0, 0, 0)'}
//                 strokeWidth={ 0.5 }
//               />
//             ))
//           }
//         </g>
//       </svg>
//       <button onClick={() => {
//         this.setState({blips: []});
//         return console.log(this.state);
//       }}>Click For State!</button>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     blips: state.blips
//   }
// }
//
// // <g className="blip">
// //   {
// //     this.state.usaData.map((blip,i) => (
// //       <path
// //         key={ `bubble-${ i }`}
// //         d={{
// //           innerRadius: 0,
// //           outerRadius: 100,
// //           startAngle: 0,
// //           endAngle: Math.PI / 2
// //         } }
// //         className="blip-bubble"
// //         fill={ `rgba(38,50,56,${Math.sqrt(blip.heat/10)}` }
// //         stroke="#888"
// //         strokeWidth={ 0.5 }
// //       />
// //     ))
// //   }
// // </g>
//
// export default connect(mapStateToProps, { getBlips })(Map);
