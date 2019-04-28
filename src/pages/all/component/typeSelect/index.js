import React, { Component } from "react";
import { Button } from 'antd';
import "./style.scss";

export default class TypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { text: '全部', key: 'all' }, 
        { text: '爱情', key: 'love' },
        { text: '旅行', key: 'travel' },
        { text: '友情', key: 'friend' },
        { text: '交换人生', key: 'changeLife' },
        { text: '相亲故事', key: 'dateStory' },
        { text: '生活励志', key: 'motivational' },
        { text: '亲情', key: 'family' },
        { text: '成长', key: 'growth' },
        { text: '糗事一箩筐', key: 'embarrass' },
        { text: '职业', key: 'profession' }
      ]
    };
  }
  componentDidMount() {
    
  }
  handleClick = (item) => {
    this.props.setParentState({
      type: item.key
    });
  }
  render() {
    const { options } = this.state;
    const { type } = this.props;
    return (
      <ul className="type-select">
        {options.map((item,index) => {
          // return <li onClick={this.handleClick.bind(this,item)} className={item.key == type ? 'activeT' : ''} index={index} key={item.key}>{item.text}</li>
          return <Button className="type-btn" type={item.key == type ? 'primary' : 'default'} onClick={this.handleClick.bind(this,item)} index={index} key={item.key}>{item.text}</Button>
        })}
      </ul>
    );
  }
}
 