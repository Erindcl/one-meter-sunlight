import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Menu, Icon } from 'antd';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';
import './scss/base.scss';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      openDrawer: false,
      openKeys,
    };

    this.openKeysCache = openKeys;
  }
  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取默认展开菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;
    const menus = this.getNavMenuItems(asideMenuConfig);

    let openKeys = [];
    if (Array.isArray(menus)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname && pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }

    return openKeys;
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 获取菜单项数据
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item, index) => {
        return this.getSubMenuOrItem(item, index);
      });
  };

  /**
   * 二级导航
   */
  getSubMenuOrItem = (item, index) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu key={index} title={
            <span>
              {item.icon ? (
                <Icon size="small" type={item.icon} />
              ) : null}
              <span className="ice-menu-collapse ice-menu-collapse-hide">
                {item.name}
              </span>
            </span>
          }>
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>
    );
  };

  render() {
    const { openDrawer } = this.state;
    const {
      location: { pathname }
    } = this.props;

    return (
      <div
        className={cx('layout-aside', { 'open-drawer': openDrawer }, 'side-menu-box')}
      >
        <Menu
          style={{ width: 200 }}
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={[pathname]}
          onClick={this.onMenuClick}
          onOpenChange={this.onOpenChange}
          mode="inline"
          theme="dark"
        >
          {this.getNavMenuItems(asideMenuConfig)}
        </Menu>
      </div>
    );
  }
}
