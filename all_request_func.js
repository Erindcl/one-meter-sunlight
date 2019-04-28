import React, { Component } from "react";
import TypeSelect from './component/typeSelect';
import OrderSelect from './component/orderSelect';
import NoteList from './component/noteList';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
import "./style.scss";

export default class All extends Component {
  constructor(props) {
    
  }
  componentDidMount() {
    // this.payCorn();
  }

  getStoryList = () => {
    const { pageNo, pageSize, type, order } = this.state;
    API.getStoryList({
      theme: type, // 可选
      // id: [1,2],  // 可选
      pageSize: pageSize, 
      pageNo: pageNo, 
      sort: order
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
      id: ['5c88f0ce4ec74b19ccf8ca8e','5c9d74e03ecbdaae11bb7659'], 
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
      remarkId: '5ca348161dc85b2de8836abe'
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
      remarkId: '5ca347041dc85b2de8836abc',
		  userId: '5c88f0624ec74b19ccf8ca8d' // 这些id值使用数据库自动生成的那个_id的值
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
      remarkId: '5ca347041dc85b2de8836abc',
		  userId: '5c88f0624ec74b19ccf8ca8d'
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
      email: 'test1',
	    password: '1234567'
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
      userName: '123456',
      email: 'hhh@123.com',
      password: '12345678'
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
      email: 'hhh@123.com'
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
      userId: '5ca34ea975e2105aec133303' // 参数待添加
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
      userId: '5ca34ea975e2105aec133303',
	    corn: 56
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
      userId: '5ca34ea975e2105aec133303',
      corn: 1111,
      storyIdList: ['5c8c9489c1e8f80e8003cedd']
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
      userId: '5ca34ea975e2105aec133303',
      storyId: '5c8c9489c1e8f80e8003cedd'
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        console.log(data);
      } else {
        Message.error(message);
      }
    });
  }
  
  setSelfState = (obj) => {
    this.setState({
      ...obj,
      pageNo: 1
    }, () => {
      // this.getStoryList();
    });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      // this.getStoryList();
    })
  }

  render() {
    const { type,  order, listData, pageNo, total, pageSize }=this.state;
    return (
      <div className="all-container">
        <TypeSelect setParentState={this.setSelfState} type={type} />
        <OrderSelect setParentState={this.setSelfState} order={order} />
        <div className="list-box">
          <NoteList listData={listData} />
          <dvi className="pagination-box">
            <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
          </dvi>
        </div>
      </div>
    );
  }
}
 