import React, { Component } from "react";
import { Card, Col, Row } from 'antd';
import "./style.scss";

const { Meta } = Card;

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [{
        imgSrc: require('assets/imgs/t1.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }, {
        imgSrc: require('assets/imgs/t2.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }, {
        imgSrc: require('assets/imgs/t4.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }, {
        imgSrc: require('assets/imgs/t3.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }, {
        imgSrc: require('assets/imgs/t6.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }, {
        imgSrc: require('assets/imgs/t7.jpg'),
        title: '一切来得太突然',
        remark: 20,
        watch: 34,
        coin: 3,
      }]
    };
  }
  componentDidMount() {
    
  }
  render() {
    const { listData }=this.state;
    return (
      <div className="note-list">
        <Row wrap gutter={12}>
          {listData.map((item,index) => (
            <Col span={6}>
              <Card 
              bordered={false} 
              hoverable
              className="card-margin-bottom"
              cover={<img alt="example" src={item.imgSrc} />}
              >
                <Meta
                  title={item.title}
                  description={`浏览:${item.watch}  评论:${item.remark}  币:${item.coin}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
 