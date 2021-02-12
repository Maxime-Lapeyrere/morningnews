import React, {useState}  from 'react';
import '../App.css';
import {Menu} from 'antd';
import Icon from '@ant-design/icons';
import { ReadOutlined,HomeOutlined, LogoutOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";


function Nav() {


  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to="/source"><HomeOutlined type="home" /></Link>
          Sources
        </Menu.Item>

        <Menu.Item key="test">
        <Link to="/myArticles"><ReadOutlined type="read" /></Link>
          My Articles
        </Menu.Item>

        <Menu.Item key="app">
        <Link to='/'><LogoutOutlined type="logout" />Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
