import React, { Component } from "react";
import "./style.scss";

export default class TypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { text: '全部', key: 'all' }, 
        { text: '情感', key: 'motion' },
        { text: '伤感', key: 'sad' },
        { text: '怀旧', key: 'old' },
        { text: '幸福', key: 'happy' },
        { text: '感动', key: 'move' },
        { text: '曾经', key: 'even' },
      ],
      nowSelect: 'all'
    };
  }
  componentDidMount() {
    
  }
  render() {
    const { options, nowSelect }=this.state;
    return (
      <ul className="type-select">
        {options.map((item,index) => {
          return <li className={item.key == nowSelect ? 'activeT' : ''} index={index} key={item.key}>{item.text}</li>
        })}
      </ul>
    );
  }
}
 