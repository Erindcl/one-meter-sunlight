import React from 'react';
import { Layout, Dropdown, Menu,Avatar,Icon } from 'antd';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
import './style.scss';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout() {
    //
  }


  render() {
    const { navData, location, userData } = this.props;
    let menuKeys=location.pathname.match(/\/\w*/g);
    const topMenu=(
      <Menu  mode="horizontal"
        selectedKeys={[menuKeys[0]]}
        style={{ verticalAlign: 'middle',lineHeight: '62px', background:'#000'}} >
        {navData.length?
          navData.map((item,idx)=>(
            <Menu.Item key={item.permissionUrl.match(/\/\w*/g)[0]}>  
              <NavLink to={item.permissionUrl}>{item.permissionName}</NavLink>
            </Menu.Item>
          )):<Icon type="appstore" />
        }
    </Menu>
    );
    const selfMenu=(
      <Menu onClick={this.logout}>
        <Menu.Item key="1">
          <NavLink to='/login'>退出</NavLink>
        </Menu.Item>
      </Menu>
    )
    return <Header className="top-bar">
      <div className="logo">
        <Link to="/index">
          <img src={ FRONT_CONF.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <ul className="menu-ul">
        <li className="active">首页</li>
        <li>发现</li>
        <li>个人收藏</li>
      </ul>
      {/* <div className="fl top-bar-nav"> */}
       {/* {topMenu} */}
      {/* </div> */}
      <div className="fr">
        <Dropdown overlay={selfMenu}>
          <div className="right user-moudle" style={{height:52}}>
            <Link to={{ pathname: '/login' }}>
              <Avatar icon="user" />
              <span className="name"> kangaroo</span>
            </Link>
          </div> 
        </Dropdown>
      </div>
    </Header>
  }
}
