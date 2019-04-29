import React, { Component } from 'react';
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar";
import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';
import localDb from '@/utils/localDb.js';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';

import { bindActionCreators } from "redux";
import './style.scss';
const { Header, Footer } = Layout;
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNavData({});
    if (localDb.get('email')) {
      this.props.getUserData({ email: localDb.get('email') });
    }
  }
  componentWillReceiveProps(nextProps) {}

  linkTo = (url) => {
    if (url == '/login') {
      localDb.clear();
    }
    this.props.history.push(url);
  }

  render() {
    const {  navData, match, location, userData } = this.props;
    let realNavData = localDb.get('email') ? navData.topNav.slice(0,5) : [...navData.topNav.slice(0,3), ...navData.topNav.slice(5)];
    return (
       <Layout className="main-layout">
       <ErrorBoundary>
        <Header><TopBar linkTo={this.linkTo} location={location}  navData={realNavData} /></Header>
        <Layout className="top-layout">
          <div className="content">{this.props.children}</div>
          <Foot/>
        </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
