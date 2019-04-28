import React, { Component } from "react";
import { Button, Divider, Comment, Empty, List, Pagination } from 'antd';
import moment from 'moment';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
import "./style.scss";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkData: [],
      detailInfor: {},
      total: 0
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
        });
        if (data.remarkGroup) {
          this.getRemarkList(data.remarkGroup);
        }
      } else {
        Message.error(message);
      }
    });
  }

  getRemarkList = (ids) => {
    API.getRemarkList({
      id: ids, 
      pageSize: 1, 
      pageNo: 1
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        this.setState({ 
          remarkData: data.list || [],
          total: data.total || 0
        });
      } else {
        Message.error(message); 
      }
    });
  }

  render() {
    const { remarkData, detailInfor, total } = this.state;
    let realImgSrc = detailInfor.coverPic ? require(`assets/imgs/article/${detailInfor.coverPic}`) : '';
    let contentArray = detailInfor.contentPart ? detailInfor.contentPart.split('\n') : [];
    return (
      <div className="article-container">
        <div className="cover-img" style={{ backgroundImage: `url(${realImgSrc})`, 
        backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundAttachment: 'fixed'}}></div>
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
            dataSource={remarkData.length > 0 ?remarkData : [1]}
            renderItem={(item) => {
              return remarkData.length > 0 ?  (
                <Comment
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              ) : <Empty description={'暂无评论'} />;
            }}
          />
          <Pagination style={{ marginTop: 20 }} defaultCurrent={1} total={total} />
        </div>
      </div>
    );
  }
}
 