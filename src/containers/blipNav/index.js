import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Affix, Button, Menu } from 'antd';
const MenuItem = Menu.Item;
const ButtonGroup = Button.Group;

class BlipNav extends Component {
  constructor(props) {
    super(props);

    this.state = { currentTab : '' };
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(event) {
    this.setState({ currentTab: event.key });
  }

  render() {
    return (
      <Affix>
        <Menu
          onClick={this.onTabChange}
          selectedKeys={[this.state.currentTab]}
          mode="horizontal"
          theme="dark"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff"
          }}
        >
          <MenuItem key="home">
            Navigation One
          </MenuItem>
          <MenuItem key="about">
            Navigation Two
          </MenuItem>
          <MenuItem key="github">
            Navigation Three
          </MenuItem>
        </Menu>
      </Affix>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(BlipNav);
