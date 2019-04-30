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
    const { userData }=this.props;
    let realUBP = require(`assets/imgs/user/${userData.bgPic}`);
    let realHP = require(`assets/imgs/user/${userData.headPic}`);
    return (
      <div className="base-infor">
        <div className="user-cover" style={{ backgroundImage: `url(${realUBP})`, 
        backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundAttachment: 'fixed'}}></div>
        <div class="infor-box">
          <div className="user-hp-box">
            <img src={realHP}></img>
          </div>
          <div className="user-infor">
            <div className="name">
              {userData.name}
              <span>${userData.corn}</span>
            </div>
            <div className="intro">{userData.intro}</div>
          </div>
        </div>
      </div>
    );
  }
}
