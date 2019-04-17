import React, { Component } from "react";
import "./style.scss";
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

import BaseInfor from './components/baseInfor'
import AllInfor from './components/allInfor'
import HistoryRemark from './components/historyRemark'
import PaiedStory from './components/paiedStory'
import ShopCar from './components/shopCar'
import TopUp from './components/topUp'

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  callback = () => {

  }

  render() {
    const {  }=this.state;
    const tabsOption = [{
      title: '我的购物车',
      content: <ShopCar />
    },{
      title: '基本信息',
      content: <AllInfor />
    },{
      title: '历史订单',
      content: <PaiedStory />
    },{
      title: '历史评论',
      content: <HistoryRemark />
    },{
      title: '米币充值',
      content: <TopUp />
    }]
    return (
      <div className="user-page">
        <BaseInfor />
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
