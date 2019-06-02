import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as home  from "./aciton"; 
import moment from "moment";
import { API } from "@/api/index.js";
import { message as Message, Pagination } from 'antd';
moment.locale("zh-cn");
import "./style.scss";

import { Button, Divider, Row, Col } from 'antd';

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home}, dispatch)
)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataByType: [],
      listDataById: []
    };
  }
  componentDidMount() {
    this.props.getHomeData({});
    this.getStoryListByType();
    this.getStoryListByIds();
  }

  getStoryListByType = () => { // 获取指定分类故事列表
    API.getStoryList({
      theme: 'friend', 
      pageSize: 4, 
      pageNo: 1, 
      // sort: 'time'
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({ 
          listDataByType: data.list || [],
        });
      } else {
        Message.error(message);
      }
    });
  }

  getStoryListByIds = () => {
    API.getStoryList({
      id: ['5cc028aede2896229759d72c','5cc029c4de2896229759d765','5cc04721de2896229759dd4d','5cc04a59de2896229759de03','5cc04b37de2896229759de37'],  // 可选
      pageSize: 10, 
      pageNo: 1, 
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({
          listDataById: data.list || [],
        })
      } else {
        Message.error(message);
      }
    });
  }

  redirectToPath = (param) => {
    // console.log(this.props)
    if (param == 'all') {
      this.props.history.push('/all');
    } else {
      this.props.history.push(`/all/${param._id}`);
    }
  }
  
  render() {
    const { listDataByType, listDataById }=this.state;
    return (
      <div className="home-page">
        <div className="banner-part">
          <img src={require('assets/imgs/fire.jpg')}></img>
          <div className="welcome-box">
            <h3>愿你在这能找到</h3>
            <h1>那温暖你心房的一米阳光</h1>
            <Button className="btn" type="primary" onClick={this.redirectToPath.bind(this,'all')}>探索更多</Button>
          </div>
        </div>
        <div className="found-part">
          <Divider className="head-big">寻</Divider>
          <div className="head-small">人生就是在不停奔跑追寻着什么</div>
          <Row gutter={16}>
            {listDataById.length > 0 && listDataById.map((item,index) => {
              let realSrc = require(`assets/imgs/article/${item.coverPic}`);
              return index < 3 ? (
                <Col span={8} key={index} onClick={this.redirectToPath.bind(this,item)}>
                  <div className="first-box">
                    <img src={realSrc} className="img-auto"></img>
                    <div className="mask">
                      <div className="content-box">
                        <p>{item.title}</p>
                        <p className="small">${item.payCorn}</p>
                        <p className="small">/</p>
                        <p className="small">{item.auther}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ) : '';
            })}
          </Row>
          <Row gutter={16}>
            {listDataById.length > 0 && listDataById.map((item,index) => {
              let realSrc = require(`assets/imgs/article/${item.coverPic}`);
              return index > 2 ? (
                <Col span={12} key={index} onClick={this.redirectToPath.bind(this,item)}>
                  <div className="second-box">
                    <img src={realSrc} className="img-auto"></img>
                    <div className="mask">
                      <div className="content-box">
                        <p>{item.title}</p>
                        <p className="small">${item.payCorn}<span>/</span>{item.auther}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ) : '';
            })}
          </Row>
        </div>
        <div className="firend-part">
          <Divider className="head-big">友</Divider>
          <div className="head-small">无需过多言语，就能让人感觉温暖</div>
          <Row gutter={16}>
            {listDataByType.length > 0 && listDataByType.map((item,index) => {
              let realSrc = require(`assets/imgs/article/${item.coverPic}`);
              return (
                <Col span={12} key={index} onClick={this.redirectToPath.bind(this,item)}>
                  <div className="outside-box">
                    <img src={realSrc}></img>
                    <div className="text-box">
                      <p>{item.title}</p>
                      <p className="small">${item.payCorn}<span>/</span>{item.auther}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}
