import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
            <Link to='/home'>Home</Link>
          </MenuItem>
          <MenuItem key="about">
            <Link to='/about'>About</Link>
          </MenuItem>
          <MenuItem key="source">
            <Link to='/source'>Source</Link>
          </MenuItem>
        </Menu>
      </Affix>
    );
  }
}

export default BlipNav;
