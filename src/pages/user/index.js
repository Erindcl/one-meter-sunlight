import React, { Component } from "react";
import "./style.scss";
import { Tabs } from 'antd';
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { bindActionCreators } from "redux";
import localDb from '@/utils/localDb.js';
const TabPane = Tabs.TabPane;

import BaseInfor from './components/baseInfor'
import AllInfor from './components/allInfor'
import HistoryRemark from './components/historyRemark'
import PaiedStory from './components/paiedStory'
import ShopCar from './components/shopCar'
import TopUp from './components/topUp'

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  reGetUserData = () => {
    this.props.getUserData({ email: localDb.get('email') });
  }

  callback = () => {

  }

  render() {
    const { userData } = this.props;
    const tabsOption = [{
      title: '我的购物车',
      content: <ShopCar key={userData.shoppingcar.length} reGetUserData={this.reGetUserData} userData={userData} />
    },{
      title: '基本信息',
      content: <AllInfor userData={userData} />
    },{
      title: '历史订单',
      content: <PaiedStory userData={userData} />
    },{
      title: '历史评论',
      content: <HistoryRemark userData={userData} />
    },{
      title: '米币充值',
      content: <TopUp userData={userData} />
    }]
    return (
      <div className="user-page">
        <BaseInfor userData={userData} />
        <div className="tabs-box">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {tabsOption.map((item,index) => (
              <TabPane tab={item.title} key={index}>{item.content}</TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}
