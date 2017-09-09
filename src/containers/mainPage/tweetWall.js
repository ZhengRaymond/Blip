import React, { Component } from "react"
import { connect } from 'react-redux';
import { getBlip } from 'actions/index';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import { Tweet } from 'react-twitter-widgets'

class TweetWall extends Component {
  componentWillMount() {
    this.props.getBlip();
    setInterval(() => {
      this.props.getBlip();
    }, 20000);
  }

  render() {
    return (
      <div style={{maxHeight: "500px", overflowY: "auto", margin: "5px 40px", borderTop: "solid", borderBottom: "solid"}}>
        {
          map(this.props.tweets, (tweet) => {
            return (
              <Tweet key={tweet} tweetId={tweet} options={{cards:"hidden"}}/>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.blips.tweets
  }
}

export default connect(mapStateToProps, { getBlip })(TweetWall);
