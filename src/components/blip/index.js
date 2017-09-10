import React, { Component } from 'react';
import './index.css';

class Blip extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    }
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    })
  }

  render() {
    const { blip, blipName, pathGenerator, active } = this.props;

    let color, r, corner;
    if (active) {
      r = 100;
      corner = 0;
      color = 'rgba(255, 255, 160, 0.9)';
    } else {
      r = (Math.min(Math.max(blip.heat, 20), 90) * (this.state.hover ? 1.3 : 1.0));
      corner = r/2;
      if (blip.positive) {
        color = `rgba(80, 150, ${Math.floor(blip.heat) + 175}, ${this.state.hover ? 0.9:0.6})`;
      } else {
        color = `rgba(${Math.floor(blip.heat) + 175}, 80, 150, ${this.state.hover ? 0.9:0.6})`;
      }
    }

    const path = pathGenerator()({
      "type": "Point",
      "coordinates": [blip.lng,blip.lat]
    });
    const path_arr = path.split(',');
    const cx = parseFloat(path_arr[0].substring(1)) - r/2;
    const cy = parseFloat(path_arr[1].substring(0, path_arr[1].length - 5)) - r/2;
    const textOffset = active ? -20 : 0;
    return (
      <g
        className="blip"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={() => { this.props.onClick(this.props.blipName) }}
      >
        <rect
          className="blip"
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
        <text
          x={cx + r/2}
          y={cy + r/2 - 7 + textOffset}
          fontFamily="Arial"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          pointerEvents="none"
          style={{userSelect: "none"}}
          className={active ? 'blip-text-active' : (this.state.hover ? 'blip-text-hover' : 'blip-text')}
        >
          {blipName}
        </text>
        <text
          x={cx + r/2}
          y={cy + r/2 + 7 + textOffset}
          fontFamily="Arial"
          fontSize="10"
          textAnchor="middle"
          pointerEvents="none"
          style={{userSelect: "none"}}
          className={active ? 'blip-text-active' : (this.state.hover ? 'blip-text-hover' : 'blip-text')}
        >
          {Math.floor(blip.heat) + " Hits!"}
        </text>
      </g>
    )
  }
}

export default Blip;
