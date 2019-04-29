import React, { Component } from 'react';
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar";
import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';

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
    // this.props.getUserData({});
    console.log("this.props")
    console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {}

  linkTo = (url) => {
    this.props.history.push(url);
  }

  render() {
    const {  navData,match, location } = this.props;
    return (
       <Layout className="main-layout">
       <ErrorBoundary>
        <Header><TopBar linkTo={this.linkTo} location={location}  navData={navData.topNav} /></Header>
        <Layout className="top-layout">
          <div className="content">{this.props.children}</div>
          <Foot/>
        </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
