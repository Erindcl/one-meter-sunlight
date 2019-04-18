import React, { Component } from "react";
import "./style.scss";
import { Timeline, Icon } from 'antd';

export default class HistoryRemark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: [
        { date: '2019-10-15 11:15:45', content: '这个故事太温馨了太温馨了太温馨了太温馨了太温馨了太温馨了太温馨了太温馨了太温馨了太温馨了，超级感动！', story: 'xxxxx' },
        { date: '2019-10-15 11:15:45', content: '这个故事太温馨了，超级感动！', story: 'xxxxx' },
        { date: '2019-10-15 11:15:45', content: '这个故事太温馨了，超级感动！', story: 'xxxxx' },
        { date: '2019-10-15 11:15:45', content: '这个故事太温馨了，超级感动！', story: 'xxxxx' },
        { date: '2019-10-15 11:15:45', content: '这个故事太温馨了，超级感动！', story: 'xxxxx' },
      ]
    };
  }
  componentDidMount() {
    
  }
  render() {
    const { remarks }=this.state;
    return (
      <div className="history-remark">
        <Timeline reverse={false}>
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
        </Timeline>
      </div>
    );
  }
}
