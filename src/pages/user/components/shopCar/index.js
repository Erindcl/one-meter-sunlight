import React, { Component } from "react";
import "./style.scss";
import { Card, Pagination, Button, Checkbox, Modal, Row, Col, Input, message as Message } from 'antd';

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
      }],
      visible: false,
      orderDetails: [],
      password: '',
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
    let orderDetails = [];
    const { checkedIds, storyData } = this.state;
    storyData.forEach((item) => {
      if (checkedIds.indexOf(item.id) != -1) {
        orderDetails.push(item.title);
      }
    })
    this.setState({
      orderDetails: orderDetails,
      visible: true,
    });
  }

  handleOk = (e) => {
    const { password } = this.state;
    if (password == '') {
      Message.warning('请输入支付密码');
    } else {
      if (password != '123456') {
        Message.error('支付密码错误，请重新输入');
      } else {
        // 请求购买故事
        this.setState({
          visible: false,
          password: ''
        });
      }
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      password: ''
    });
  }

  handleInputChange = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    const { pageNo, total, pageSize, storyData, checkedIds, visible, password, orderDetails }=this.state;
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
        <Modal
          title="确认订单并支付"
          visible={visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row getter={16}>
            <Col style={{ textAlign: 'right' }} span={6}>本次订单包括：</Col>
            <Col span={16}>{orderDetails.map((item,index) => {
              return index == 0 ? item : (<span><br />{item}</span>)
            })}</Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col style={{ textAlign: 'right' }} span={6}>支付密码：</Col>
            <Col span={16}>
              <Input onChange={this.handleInputChange} value={password} placeholder="请输入支付密码" type="password" />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
