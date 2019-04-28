import React, { Component } from "react";
import TypeSelect from './component/typeSelect';
import OrderSelect from './component/orderSelect';
import NoteList from './component/noteList';
import { API } from "@/api/index.js";
import { message as Message, Pagination } from 'antd';
import "./style.scss";

export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'all',
      order: 'time',
      listData: [],
      pageNo: 1,
      total: 22,
      pageSize: 20
    };
  }
  componentDidMount() {
    this.getStoryList();
  }

  getStoryList = () => {
    const { pageNo, pageSize, type, order } = this.state;
    API.getStoryList({
      theme: type, 
      pageSize: pageSize, 
      pageNo: pageNo, 
      sort: order
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({ 
          listData: data.list || [],
          total: data.total || 0
        });
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
      this.getStoryList();
    });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({ pageNo: page }, () => {
      this.getStoryList();
    })
  }
  
  redirectTo = (id) => {
    this.props.history.push(`all/${id}`)
  }

  render() {
    const { type,  order, listData, pageNo, total, pageSize }=this.state;
    return (
      <div className="all-container">
        <TypeSelect setParentState={this.setSelfState} type={type} />
        <OrderSelect setParentState={this.setSelfState} order={order} />
        <div className="list-box">
          <NoteList listData={listData} redirectTo={this.redirectTo} />
          <dvi className="pagination-box">
            <Pagination current={pageNo} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
          </dvi>
        </div>
      </div>
    );
  }
}
 