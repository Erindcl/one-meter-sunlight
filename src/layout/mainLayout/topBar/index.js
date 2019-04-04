import React from 'react';
import { Layout, Dropdown, Menu,Avatar,Icon } from 'antd';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
import './style.scss';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { navData, location, userData } = this.props;
    
    return <Header className="top-bar">
      <div className="logo">
        <Link to="/index">
          <img src={ FRONT_CONF.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <ul className="menu-ul">
        {navData.map((item,index) => (
          <li 
            className={location.pathname == item.permissionUrl ? "active" : ""} 
            key={index} 
            onClick={() => {this.props.linkTo(item.permissionUrl)}}
          >{item.permissionName}</li>
        ))}
      </ul>
    </Header>
  }
}
