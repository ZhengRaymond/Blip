import React, { Component } from 'react';
import { connect } from 'react-redux';

class BlipHeader extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#fff", margin: "80px 0px 35px 0px", fontSize: "80px", textAlign: "center", verticalAlign: "middle"}}>
        Blip
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(BlipHeader);
