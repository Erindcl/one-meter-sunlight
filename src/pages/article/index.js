import React, { Component } from "react";
import { Button, Divider, Comment, Tooltip, List, Pagination } from 'antd';
import moment from 'moment';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
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
      ],
      detailInfor: {},
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ id: this.props.match.params.id }, () => {
      this.getStoryDetail();
    })
  }

  getStoryDetail = () => {
    API.getStoryDetail({
      storyId: this.state.id
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({
          detailInfor: data || {}
        })
      } else {
        Message.error(message);
      }
    });
  }

  render() {
    const { imgsrc, remarkData, detailInfor } = this.state;
    let realImgSrc = detailInfor.coverPic ? require(`assets/imgs/article/${detailInfor.coverPic}`) : '';
    let contentArray = detailInfor.contentPart ? detailInfor.contentPart.split('\n') : [];
    return (
      <div className="article-container">
        <div className="cover-img" style={{ backgroundImage: `url(${realImgSrc})`, 
        backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundAttachment: 'fixed'}}></div>
        {/* <img src={realImgSrc} className="cover-img"></img> */}
        <div className="cover-mask">
          <div className="artcle-infor">
            <div className="title">{detailInfor.title}</div>
            <div className="des">
              <span>浏览：{detailInfor.watchCount}</span>
              <span>评论：{detailInfor.remarkCount}</span>
              <span>币：{detailInfor.payCorn}</span>
            </div>
            <div className="des">
              <span>{detailInfor.date}</span>
              <span>BY：{detailInfor.auther}</span>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="article-text">
            {contentArray.length ==  0 ? '暂无内容，请稍后访问' : contentArray.map((item,index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="btn-box">
            <Button type="primary" style={{ marginRight: 20 }}>添加购物车</Button>
            {/* <Button type="primary" disabled style={{ marginRight: 20 }}>已添加购物车</Button> */}
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
 