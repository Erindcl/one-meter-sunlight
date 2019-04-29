import React, { PureComponent } from 'react';
import { Layout, Popover, Icon } from 'antd';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './scss/base.scss';
import localDb from '@/utils/localDb.js';

const { Header } = Layout;

export default class HeaderPage extends PureComponent {

  clearLocalDB = () => {
    localDb.clear();
  }

  render() {
    const { className, style } = this.props;

    return (
      <Header
        className={cx('layout-header', className)}
        style={{ ...style }}
      >
        <Logo />

        <div className="layout-header-menu">
          <Popover placement="bottom" content={(
            <ul className="user-profile-menu">
              <li className="user-profile-menu-item">
                <Link to="/setting/basic">
                  <Icon type="setting" />
                  设置
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/login" onClick={this.clearLocalDB}>
                  <Icon type="export" />
                  退出
                </Link>
              </li>
            </ul>
          )}>
              <div className="header-userpannel">
                <img
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name">阿暖</span>
                  <span className="user-department">管理员</span>
                </div>
              </div>
          </Popover>
        </div>
      </Header>
    );
  }
}
