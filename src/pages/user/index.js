import React, { Component } from "react";
import "./style.scss";

import BaseInfor from './baseInfor'

export default class User extends Component {
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
      <div>
        <BaseInfor />
        个人中心
      </div>
    );
  }
}
