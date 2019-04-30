import React, { Component } from "react";
import "./style.scss";
import { Timeline, Icon, Button, Empty } from 'antd';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';

export default class HistoryRemark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: []
    };
  }
  componentDidMount() {
    this.getRemarkList();
  }

  getRemarkList = () => {
    const { postRemarks } = this.props.userData;
    API.getRemarkList({
      id: postRemarks, 
      pageSize: 1, 
      pageNo: 500
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({ remarks: data.list || [] })
      } else {
        Message.error(message); 
      }
    });
  }

  render() {
    const { remarks }=this.state;
    return (
      <div className="history-remark">
        {remarks.length > 0 ? <Timeline reverse={false}>
          <Timeline.Item dot={<Icon type="loading" style={{ fontSize: '16px' }} />}>
              <div className="date">更多评论等待你的添加...</div>
              {/* <div className="content">{item.content}</div> */}
          </Timeline.Item>
          {remarks.map((item,index) => (
            <Timeline.Item dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />} key={index}>
              <div className="date">您于 {item.date} 对 {item.story} 评论到</div>
              <div className="content">{item.content}</div>
            </Timeline.Item>
          ))}
        </Timeline> : <Empty style={{ padding: '50px 0px' }} description={'您还没有评论过，赶快去添加吧！'} />}
      </div>
    );
  }
}
