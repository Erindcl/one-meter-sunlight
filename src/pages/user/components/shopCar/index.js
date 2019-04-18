import React, { Component } from "react";
import "./style.scss";
import { Card, Pagination, Button, Checkbox } from 'antd';

export default class ShopCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      total: 22,
      pageSize: 20,
      checkedIds: [],
      storyData: [{
        date: '2019-04-04 12:15:45',
        id: 1,
        title: '咖啡店那一角的风景',
        corn: '20',
        imgSrc: require('assets/imgs/t6.jpg'),
      },{
        date: '2019-04-04 12:15:45',
        id: 2,
        title: '咖啡店那一角的风景',
        corn: '20',
        imgSrc: require('assets/imgs/t2.jpg'),
      },{
        date: '2019-04-04 12:15:45',
        id: 3,
        title: '咖啡店那一角的风景',
        corn: '20',
        imgSrc: require('assets/imgs/t3.jpg'),
      },{
        date: '2019-04-04 12:15:45',
        id: 4,
        title: '咖啡店那一角的风景',
        corn: '20',
        imgSrc: require('assets/imgs/t4.jpg'),
      }]
    };
  }
  componentDidMount() {
    
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      // this.getStoryList();
    })
  }

  handleCheckboxChange = (index) => {
    console.log(`checked = ${index}`);
    const { checkedIds } = this.state;
    let temIndex = checkedIds.indexOf(index);
    if (temIndex != -1) {
      checkedIds.splice(temIndex,1);
    } else {
      checkedIds.push(index);
    }
    this.setState({ checkedIds: checkedIds });
  }

  handleSelectAll = (type) => {
    const { storyData } = this.state;
    let temArr = [];
    if (type == 'all') {
      storyData.forEach((item) => {
        temArr.push(item.id);
      })
    }
    this.setState({ checkedIds :temArr });
  }

  handlePayBtnClick = () => {
    console.log("this.state.checkedIds")
    console.log(this.state.checkedIds)
  }

  render() {
    const { pageNo, total, pageSize, storyData, checkedIds }=this.state;
    return (
      <div className="shop-car">
        <dvi className="top-box">
          <div className="btn-box">
            {storyData.length != checkedIds.length && <Button type="primary" onClick={this.handleSelectAll.bind(this, 'all')} style={{ marginRight: '10px' }}>全选</Button>}
            {storyData.length == checkedIds.length && <Button type="primary" onClick={this.handleSelectAll.bind(this, 'cancel')} style={{ marginRight: '10px' }}>取消全选</Button>}
            <Button type="primary" onClick={this.handlePayBtnClick} disabled={checkedIds.length > 0 ? false : true}>购买</Button>
          </div>
          <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
        </dvi>
        {storyData.map((item,index) => (
          <Card
            type="inner"
            key={index}
            style={index == 0 ? {} : { marginTop: 16 }}
            title={item.date}
            extra={<a href="#">查看</a>}
          >
            <div className="story-item-box">
              <Checkbox checked={checkedIds.indexOf(item.id) == -1 ? false : true} onChange={this.handleCheckboxChange.bind(this, item.id)}></Checkbox>
              <div className="img-box">
                <img src={item.imgSrc}></img>
              </div>
              <div className="infor">
                <div className="title">{item.title}</div>
                <div className="corn">米币： {item.corn}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}
