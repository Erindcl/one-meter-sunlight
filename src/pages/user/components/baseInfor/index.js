import React, { Component } from "react";
import "./style.scss";

export default class BaseInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }
  render() {
    const {  }=this.state;
    return (
      <div className="base-infor">
        <img className="user-cover" src={require('assets/imgs/t6.jpg')}></img>
        <div class="infor-box">
          <div className="user-hp-box">
            <img src={require('assets/imgs/t7.jpg')}></img>
          </div>
          <div className="user-infor">
            <div className="name">
              我不知道叫啥名
              <span>$54</span>
            </div>
            <div className="intro">我很懒，没得简介的，哈哈哈哈</div>
          </div>
        </div>
      </div>
    );
  }
}
