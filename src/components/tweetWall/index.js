import React, { Component } from "react"
import map from 'lodash/map';
import classNames from 'classnames';
import twitter from './twitter.png';
import './index.css';

import { Tweet } from 'react-twitter-widgets'

class TweetWall extends Component {
  render() {
    const existContent = this.props.tweets && Object.keys(this.props.tweets).length > 0 && this.props.selectedBlip;
    return (
      <div className='container'>
        <div className={classNames('switch', { hidden: existContent })}>
          <div style={{position: "relative", maxHeight: "500px",  overflow: "hidden"}}>
            <img style={{userSelect: "none"}} width="150px" height="150px" src={twitter} alt="Chirpy Chirp Tweet Tweet" />
          </div>
        </div>
        <div className={classNames('switch', { hidden: !existContent })}>
          {
            map(this.props.tweets, (tweet) => {
              return (
                <Tweet key={tweet} tweetId={tweet} options={{cards:"hidden"}}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default TweetWall;
