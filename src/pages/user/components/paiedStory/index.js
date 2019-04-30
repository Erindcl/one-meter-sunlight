import React, { Component } from "react";
import "./style.scss";
import { Card, Pagination, Empty } from 'antd';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';

export default class PaiedStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      total: 0,
      pageSize: 10,
      paidStoryList: []
    };
  }
  componentDidMount() {
    this.getStoryList();
  }

  getStoryList = () => {
    const { shoppingcar } = this.props.userData;
    const { pageNo, pageSize } = this.state;
    API.getStoryList({
      id: shoppingcar,  // 可选
      pageSize: pageSize, 
      pageNo: pageNo, 
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({
          paidStoryList: data.list || [],
          total: data.total
        })
      } else {
        Message.error(message);
      }
    });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      // this.getStoryList();
    })
  }

  render() {
    const { pageNo, total, pageSize, paidStoryList }=this.state;
    return (
      <div className="paied-story">
        {paidStoryList.length > 0 ? paidStoryList.map((item,index) => {
          let realImg = require(`assets/imgs/article/${item.coverPic}`);
          return (<Card
            key={index}
            style={index == 0 ? {} : { marginTop: 16 }}
            type="inner"
            title={`订单编号：${parseInt((Math.random() + 1) * Math.pow(10,11-1))}`}
            extra={<a href={`/all/${item._id}`}>查看</a>}
          >
            <div className="story-item-box">
              <div className="img-box">
                <img src={realImg}></img>
              </div>
              <div className="infor">
                <div className="title">{item.title}</div>
                <div className="corn">米币： {item.payCorn}</div>
              </div>
            </div>
          </Card>);
        }) : <Empty style={{ padding: '50px 0px' }} description={'您还没有订单哦！'} />}
        {paidStoryList.length > 0 && <dvi className="pagination-box">
          <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
        </dvi>}
      </div>
    );
  }
}
