import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { getBlips, getTweets } from 'actions/index';
import extend from 'lodash/extend';

import { Button } from 'antd';
import Map from 'components/map';
import TweetWall from 'components/tweetWall';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      blips: { },
      selectedBlip: null,
    }
    this.reloadMap = this.reloadMap.bind(this);
    this.toggleBlipActive = this.toggleBlipActive.bind(this);
  }

  componentWillMount() {
    this.props.getBlips();
    setTimeout(() => {
      this.setState({
      blips: this.props.blips
    })}, 400);
    setTimeout(() => {
      this.setState({
      blips: this.props.blips
    })}, 1000);
    setInterval(() => {
      this.props.getBlips();
      this.setState(extend({}, this.state, this.props.blips));
    }, 3000);
  }
  // let newBlips = reduce(this.state.blips, (res, val, key) => {
  //   if (Math.random() > 0.8) {
  //     val.heat = Math.random() * 50 + 15;
  //   }
  //   res[key] = val;
  //   return res;
  // }, {});

  reloadMap() {
    const newBlip = {
      lat: 34.400455 + Math.floor(Math.random() * 8),
      lng: -85.933278 - Math.floor(Math.random() * 30),
      heat: 15 + Math.floor(Math.random() * 40),
      hover: false,
      active: false,
      positive: Math.random() > 0.5
    }

    this.setState({
      ...this.state,
      ["blips"]: {
        ...this.state.blips,
        ["L"+Math.floor(Math.random()*1000)]: newBlip
      }
    })
  }

  toggleBlipActive(name) {
    this.setState({
      ...this.state,
      ["selectedBlip"]: (this.state.selectedBlip === name) ? '' : name
    });
    this.props.getTweets(name);
  }

  render() {
    return (
      <div>
        <div className="col">
          <h style={{marginTop:"10px",marginBottom:"30px", userSelect: "none"}}>Blip</h>
          <div className="row">
            <Map
              blips={this.state.blips}
              selectedBlip={this.state.selectedBlip}
              onClick={this.toggleBlipActive}
            />
            <TweetWall
              tweets={this.props.tweets}
              selectedBlip={this.state.selectedBlip}
            />
          </div>
        </div>
        <div className="handlebar">
          <Button onClick={this.reloadMap} type="primary" shape="circle" icon="reload" size="large" />
          <Button onClick={this.reloadMap} type="primary" shape="circle" icon="reload" size="large" />
          <Button onClick={this.reloadMap} type="primary" shape="circle" icon="reload" size="large" />
        </div>
      </div>
    );
  }
}

// <Button onClick={this.reloadMap} type="primary" shape="circle" icon="reload" size="large" />

function mapStateToProps(state) {
  return {
    blips: state.main.blips,
    tweets: state.main.tweets
  }
}

export default connect(mapStateToProps, { getBlips, getTweets })(MainPage);
