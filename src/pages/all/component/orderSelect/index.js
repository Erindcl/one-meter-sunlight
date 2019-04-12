import React, { Component } from "react";
import "./style.scss";

export default class OrderSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [ 
        { text: '按时间排序', key: 'time' },
        { text: '按热度排序', key: 'hot' },
      ]
    };
  }
  componentDidMount() {
    
  }
  handleClick = (item) => {
    this.props.setParentState({
      order: item.key
    });
  }
  render() {
    const { options }=this.state;
    const { order } = this.props;
    return (
      <ul className="order-select">
        {options.map((item,index) => {
          return <li  onClick={this.handleClick.bind(this,item)}  className={item.key == order ? 'activeO' : ''} index={index} key={item.key}>{item.text}</li>
        })}
      </ul>
    );
  }
}
 