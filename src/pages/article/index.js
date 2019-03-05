import React, { Component } from "react";
import { Button, Divider, Comment, Tooltip, List, Pagination } from 'antd';
import moment from 'moment';
import "./style.scss";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: require('assets/imgs/t4.jpg'),
      remarkData: [
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: (
            <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
          ),
          datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
          ),
        },
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: (
            <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
          ),
          datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
          ),
        },
      ]
      
    };
  }
  componentDidMount() {
    
  }
  render() {
    const { imgsrc, remarkData } = this.state;
    return (
      <div className="article-container">
        <img src={imgsrc} className="cover-img"></img>
        <div className="cover-mask">
          <div className="artcle-infor">
            <div className="title">一切都来的太突然</div>
            <div className="des">
              <span>浏览：20</span>
              <span>评论：10</span>
              <span>收藏：10</span>
              <span>币：2</span>
            </div>
            <div className="des">
              <span>2019-03-15</span>
              <span>BY：小囧囧</span>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="article-text">
            <p>你羡慕朋友圈中那些富丽堂皇，高贵大气的建筑下有一位你并不算太了解的朋友。也羡慕着两情相悦的伴侣可以共饮一杯水，共眠一头枕。</p>
            <p>还羡慕着年少有成，有房有车，物质生活与你相差十万八千里的有志青年。羡慕这羡慕那，你会不会感觉身心疲惫，累觉不爱？感觉一切美好的猖狂都不属于你。</p>
            <p>你只是随着人流而淹没在人流当中，恍若局外人。</p>
            <p>可你从不曾体会过，当你在羡慕别人的同时别人也正在羡慕着你......</p>
          </div>
          <div className="btn-box">
            <Button type="primary" disabled style={{ marginRight: 20 }}>已收藏</Button>
            <Button type="primary">阅读更多</Button>
          </div>
          <Divider orientation="left" style={{ fontSize: 20 }}>评论</Divider>
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={remarkData}
            renderItem={item => (
              <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            )}
          />
          <Pagination defaultCurrent={1} total={10} />
        </div>
      </div>
    );
  }
}
 