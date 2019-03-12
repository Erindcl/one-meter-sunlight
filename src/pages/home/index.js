import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as home  from "./aciton"; 
import moment from "moment";
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
      
    };
  }
  componentDidMount() {
    this.props.getHomeData({});
  }
  
  render() {
    const {  }=this.state;
    return (
      <div className="home-page">
        <div className="banner-part">
          <img src={require('assets/imgs/fire.jpg')}></img>
          <div className="welcome-box">
            <h1>欢迎进入陌生人的小世界</h1>
            <h3>遇见另一个自己</h3>
            <Button className="btn" type="primary">探索更多</Button>
          </div>
        </div>
        <div className="found-part">
          <Divider className="head-big">寻</Divider>
          <div className="head-small">人生就是在不停奔跑追寻着什么</div>
          <Row gutter={16}>
            <Col span={8}>
              <div className="first-box">
                <img src={require('assets/imgs/f4.jpg')} className="img-auto"></img>
                <div className="mask">
                  <div className="content-box">
                    <p>“你在哪”</p>
                    <p>“我还在原地，等着你”</p>
                    <p className="small">$12</p>
                    <p className="small">/</p>
                    <p className="small">就是不稀饭吃青椒</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="first-box">
                <img src={require('assets/imgs/f2.jpg')} className="img-auto"></img>
                <div className="mask">
                  <div className="content-box">
                    <p>“你在哪”</p>
                    <p>“我还在原地，等着你”</p>
                    <p className="small">$12</p>
                    <p className="small">/</p>
                    <p className="small">就是不稀饭吃青椒</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="first-box">
                <img src={require('assets/imgs/f3.jpg')} className="img-auto"></img>
                <div className="mask">
                  <div className="content-box">
                    <p>“你在哪”</p>
                    <p>“我还在原地，等着你”</p>
                    <p className="small">$12</p>
                    <p className="small">/</p>
                    <p className="small">就是不稀饭吃青椒</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className="second-box">
                <img src={require('assets/imgs/f1.jpg')} className="img-auto"></img>
                <div className="mask">
                  <div className="content-box">
                    <p>“你在哪”</p>
                    <p>“我还在原地，等着你”</p>
                    <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="second-box">
                <img src={require('assets/imgs/f5.jpg')} className="img-auto"></img>
                <div className="mask">
                  <div className="content-box">
                    <p>“你在哪”</p>
                    <p>“我还在原地，等着你”</p>
                    <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="firend-part">
          <Divider className="head-big">友</Divider>
          <div className="head-small">无需过多言语，就能让人感觉温暖</div>
          <Row gutter={16}>
            <Col span={12}>
              <div className="outside-box">
                <img src={require('assets/imgs/f1.jpg')}></img>
                <div className="text-box">
                  <p>“你在哪”</p>
                  <p>“我还在原地，等着你”</p>
                  <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="outside-box">
                <img src={require('assets/imgs/f3.jpg')}></img>
                <div className="text-box">
                  <p>“你在哪”</p>
                  <p>“我还在原地，等着你”</p>
                  <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="outside-box">
                <img src={require('assets/imgs/f2.jpg')}></img>
                <div className="text-box">
                  <p>“你在哪”</p>
                  <p>“我还在原地，等着你”</p>
                  <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="outside-box">
                <img src={require('assets/imgs/f5.jpg')}></img>
                <div className="text-box">
                  <p>“你在哪”</p>
                  <p>“我还在原地，等着你”</p>
                  <p className="small">$12<span>/</span>就是不稀饭吃青椒</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
