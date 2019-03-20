import React, { Component } from 'react';
import { Layout } from 'antd';
import MyHeader from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import './scss/index.scss';

const { Content, Sider } = Layout;

export default class BasicLayout extends Component {
  render() {
    return (
      <div className="out-layout">
        <Layout className="inner-layout">
          <MyHeader />
          <Content className="layout-section">
            <Layout className="inner-layout">
              <Sider>
                <Aside location={this.props.location} />
              </Sider>
              <Content className="layout-main">
                {this.props.children}
              </Content>
            </Layout>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}
