import React, { Component } from "react";
import "./style.scss";

export default class OrderSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [ 
        { text: '按时间排序', key: 'time' },
        { text: '按热度排序', key: 'hot' },
      ],
      nowSelect: 'time'
    };
  }
  componentDidMount() {
    
  }
  render() {
    const { options, nowSelect }=this.state;
    return (
      <ul className="order-select">
        {options.map((item,index) => {
          return <li className={item.key == nowSelect ? 'activeO' : ''} index={index} key={item.key}>{item.text}</li>
        })}
      </ul>
    );
  }
}
 