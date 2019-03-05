import React, { Component } from "react";
import "./style.scss";
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

import BaseInfor from './baseInfor'

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
      title: '我的收藏',
      content: 'bwehreh'
    },{
      title: '基本信息',
      content: 'vbwaseghehwer'
    },{
      title: '已购故事',
      content: 'vbwaseghehwer'
    },{
      title: '米币充值',
      content: 'vbwaseghehwer'
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
