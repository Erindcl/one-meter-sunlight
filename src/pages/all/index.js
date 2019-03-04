import React, { Component } from "react";
import TypeSelect from './component/typeSelect';
import OrderSelect from './component/orderSelect';
import NoteList from './component/noteList';
import "./style.scss";

export default class All extends Component {
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
 