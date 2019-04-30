import React, { Component } from "react";
import "./style.scss";
import { Card, Pagination, Button, Checkbox, Modal, Row, Col, Input, message as Message, Empty } from 'antd';
import { API } from "@/api/index.js";
export default class ShopCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      total: 0,
      pageSize: 10,
      checkedIds: [],
      storyData: [
      //   {
      //   date: '2019-04-04 12:15:45',
      //   id: 1,
      //   title: '咖啡店那一角的风景',
      //   corn: '20',
      //   imgSrc: require('assets/imgs/t6.jpg'),
      // },
    ],
      visible: false,
      orderDetails: [],
      password: '',
    };
  }
  componentDidMount() {
    this.getStoryList(); // 获取购物车列表
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
          storyData: data.list || [],
          total: data.total || 0
        })
      } else {
        Message.error(message);
      }
    });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      this.getStoryList();
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
        orderDetails.push(item);
      }
    })
    this.setState({
      orderDetails: orderDetails,
      visible: true,
    });
  }

  handleOk = (e) => {
    const { password, orderDetails } = this.state;
    if (password == '') {
      Message.warning('请输入支付密码');
    } else {
      if (password != '123456') {
        Message.error('支付密码错误，请重新输入');
      } else {
        let countCorn = 0;
        let storyIdList = [];
        orderDetails.forEach((item) => {
          countCorn += item.corn;
          storyIdList.push(item._id);
        })
        API.payCorn({
          userId: this.props.userData._id,
          corn: countCorn,
          storyIdList: storyIdList
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            Message.success(购买成功);
            this.setState({
              visible: false,
              password: ''
            });
            this.props.reGetUserData();
          } else {
            Message.error(message);
          }
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
    let countCorn = 0;
    orderDetails.forEach((item) => {
      countCorn += item.corn;
    })
    return (
      <div className="shop-car">
        {storyData.length > 0 ? <dvi className="top-box">
          <div className="btn-box">
            {storyData.length != checkedIds.length && <Button type="primary" onClick={this.handleSelectAll.bind(this, 'all')} style={{ marginRight: '10px' }}>全选</Button>}
            {storyData.length == checkedIds.length && <Button type="primary" onClick={this.handleSelectAll.bind(this, 'cancel')} style={{ marginRight: '10px' }}>取消全选</Button>}
            <Button type="primary" onClick={this.handlePayBtnClick} disabled={checkedIds.length > 0 ? false : true}>购买</Button>
          </div>
          <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
        </dvi> : ''}
        {storyData.length > 0 ? storyData.map((item,index) => {
          let realImg = require(`assets/imgs/article/${detailInfor.coverPic}`);
          return (
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
                  <img src={realImg}></img>
                </div>
                <div className="infor">
                  <div className="title">{item.title}</div>
                  <div className="corn">米币： {item.payCorn}</div>
                </div>
              </div>
            </Card>
          );
        }) : <Empty style={{ padding: '50px 0px' }} description={'购物车是空的，赶紧去添加吧!'} />}
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
              return index == 0 ? item.title : (<span><br />{item.title}</span>)
            })}
            <br /><span>总计：{countCorn}</span></Col>
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
