import React, { Component } from 'react';
import { connect } from 'react-redux';

class BlipBody extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#ddd", height: "2000px"}}>
        Body
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(BlipBody);
