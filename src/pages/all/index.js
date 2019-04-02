import React, { Component } from "react";
import TypeSelect from './component/typeSelect';
import OrderSelect from './component/orderSelect';
import NoteList from './component/noteList';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
import "./style.scss";

export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    this.supportOrAgainstRemark();
  }

  getStoryList = () => {
    API.getStoryList({
      theme: 'all', // 可选
      // id: [1,2],  // 可选
      pageSize: 1, 
      pageNo: 1, 
      sort: 'time'
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  getStoryDetail = () => {
    API.getStoryDetail({
      storyId: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  doStoryAddRemark = () => {
    API.doStoryAddRemark({
      remarkId: 1,
		  storyId: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }
  
  doStoryRemoveRemark = () => {
    API.doStoryRemoveRemark({
      remarkId: 1,
		  storyId: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  getRemarkList = () => {
    API.getRemarkList({
      id: [1,2],
      pageSize: 1, 
      pageNo: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  addRemark = () => {
    API.addRemark({
      userName: 'XXX',
      userId: 1,
      date: '2019-03-13',  
      content: '很nice',
      support: 0,
      against: 0,
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  removeRemark = () => {
    API.removeRemark({
      remarkId: 3
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  supportOrAgainstRemark = () => {
    API.supportOrAgainstRemark({
      remarkId: 1,
		  type: 'against'
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  doUserAddRemark = () => {
    API.doUserAddRemark({
      remarkId: 1,
		  userId: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  doUserRemoveRemark = () => {
    API.doUserRemoveRemark({
      remarkId: 1,
		  userId: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  userLogin = () => {
    API.userLogin({
      userName: '',
	    password: ''
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  userRegister = () => {
    API.userRegister({
      userName: '',
      email: '',
      password: ''
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  getUserBaseInfor = () => {
    API.getUserBaseInfor({
      email: ''
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  updateUserInfor = () => {
    API.updateUserInfor({
      email: '' // 参数待添加
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  putCorn = () => {
    API.putCorn({
      userId: 1,
	    coin: 56
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  payCorn = () => {
    API.payCorn({
      userId: 1,
      corn: 15,
      storyIdList: []
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  addIntoShoppingCar = () => {
    API.addIntoShoppingCar({
      userId: 1,
	    storyId: 1,
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }

  render() {
    const {  }=this.state;
    return (
      <div className="all-container">
        <TypeSelect />
        <OrderSelect />
        <div className="list-box">
          <NoteList />
        </div>
      </div>
    );
  }
}
 