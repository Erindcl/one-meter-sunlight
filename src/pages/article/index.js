import React, { Component } from "react";
import { Button, Divider, Comment, Empty, List, Pagination, Input, Modal, Row, Col, Icon, Avatar } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { bindActionCreators } from "redux";
import localDb from '@/utils/localDb.js'; 
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
import "./style.scss";
const confirm = Modal.confirm;
const { TextArea } = Input;
const IconText = ({ type, text, callback }) => (
  <span>
    <Icon onClick={callback} type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkData: [],
      detailInfor: {},
      total: 0,
      isTextAreaShow: false,
      status: 0,
      visible: false,
      password: '',
      textareaValue: ''
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const { userData, match } = this.props;
    let status = 0;
    if (userData.shoppingcar && userData.shoppingcar.indexOf(match.params.id) != -1) {
      status = 1;
    }
    if (userData.bought && userData.bought.indexOf(match.params.id) != -1) {
      status = 2;
    }
    this.setState({ 
      id: match.params.id, 
      status: status
    }, () => {
      this.doStoryAddWatch();
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

  doStoryAddWatch = () => {
    API.doStoryAddWatch({
      id: this.state.id
    }).then(response =>{ 
      const { success, message, data } = response;
      if (!success) {
        Message.error(message);
      } else {
        this.getStoryDetail();
      }
    });
  }

  getRemarkList = (ids) => {
    API.getRemarkList({
      id: ids, 
      pageSize: 100, 
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

  addIntoShoppingCar = () => {
    API.addIntoShoppingCar({
      userId: this.props.userData._id,
      storyId: this.state.id
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        Message.success("添加成功，可在购物车查看");
        this.setState({ status: 1 });
      } else {
        Message.error(message);
      }
    });
  }

  reGetUserData = () => {
    this.props.getUserData({ email: localDb.get('email') });
  }

  addRemark = () => {
    // 发布评论
    const { textareaValue, id } = this.state;
    const { userData } = this.props;
    API.addRemark({
      userName: userData.name,
      userId: userData._id,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),  
      content: textareaValue,
      support: 0,
      against: 0,
      userHp: userData.headPic,
    }).then(response =>{ 
      const { success, message, data } = response;
      if (success) {
        Message.success('发布成功'); 
        this.setState({
          textareaValue: '',
        });

        API.doStoryAddRemark({
          remarkId: data._id,
          storyId: id
        }).then(response1 =>{ 
          this.getStoryDetail();
        });

        API.doUserAddRemark({
          remarkId: data._id,
          userId: userData._id // 这些id值使用数据库自动生成的那个_id的值
        }).then(response2 =>{ 
          this.reGetUserData();
        });

      } else {
        Message.error(message);
      }
    });
  }

  showTextarea = () => {
    this.setState({ isTextAreaShow: true })
  }

  showNotice = () => {
    let _this = this;
    confirm({
      title: '是否确定购买?',
      content: '需要先购买才可查看全部',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _this.setState({ visible: true });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  handleTextareaChange = (e) => {
    this.setState({ textareaValue: e.target.value })
  }

  handleOperateRemark = (type, item) => {
    switch (type) {
      case 'support': 
        API.supportOrAgainstRemark({
          remarkId: item._id,
          type: 'support'
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            this.getStoryDetail();
          } else {
            Message.error(message);
          }
        });
        break;
      case 'against': 
        API.supportOrAgainstRemark({
          remarkId: item._id,
          type: 'against'
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            this.getStoryDetail();
          } else {
            Message.error(message);
          }
        });
        break;
      case 'delete': 
        API.removeRemark({
          remarkId: item._id
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            
          } else {
            Message.error(message);
          }
        });
        API.doStoryRemoveRemark({
          remarkId: item._id,
          storyId: this.state.id
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            this.getStoryDetail();
          } else {
            Message.error(message);
          }
        });
        API.doUserRemoveRemark({
          remarkId: item._id,
          userId: this.props.userData._id
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            this.reGetUserData();
          } else {
            Message.error(message);
          }
        });
        break;
      default:;
    }
  }

  // 以下皆为 支付相关
  handleInputChange = (e) => {
    this.setState({ password: e.target.value })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
      password: ''
    });
  }
  handleOk = (e) => {
    const { password, detailInfor } = this.state;
    if (password == '') {
      Message.warning('请输入支付密码');
    } else {
      if (password != this.props.userData.payPassword) {
        Message.error('支付密码错误，请重新输入');
      } else {
        API.payCorn({
          userId: this.props.userData._id,
          corn: detailInfor.payCorn,
          storyIdList: [detailInfor._id]
        }).then(response =>{ 
          const { success, message, data } = response;
          if (success) {
            Message.success('购买成功');
            this.setState({
              visible: false,
              password: '',
              status: 2
            });
            this.reGetUserData();
          } else {
            Message.error(message);
          }
        });
      }
    }
  }

  render() {
    const { remarkData, detailInfor, total, isTextAreaShow, status, visible, password, textareaValue } = this.state;
    
    const { userData, match } = this.props;
    let firstStatus = 0;
    if (userData.shoppingcar && userData.shoppingcar.indexOf(match.params.id) != -1) {
      firstStatus = 1;
    }
    if (userData.bought && userData.bought.indexOf(match.params.id) != -1) {
      firstStatus = 2;
    }

    let realImgSrc = detailInfor.coverPic ? require(`assets/imgs/article/${detailInfor.coverPic}`) : '';
    let contentArray = [];
    if (status != 2) {
      if (firstStatus == 2) {
        contentArray = detailInfor.contentAll ? detailInfor.contentAll.split('\n') : [];
      } else {
        contentArray = detailInfor.contentPart ? detailInfor.contentPart.split('\n') : [];
      }
    } else {
      contentArray = detailInfor.contentAll ? detailInfor.contentAll.split('\n') : [];
    }
    return (
      <div className="article-container">
        <div className="cover-img" style={{ backgroundImage: `url(${realImgSrc})`, 
        backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundAttachment: 'fixed'}}></div>
        <div className="cover-mask">
          <div className="artcle-infor">
            <div className="title">{detailInfor.title}</div>
            <div className="des">
              <span>浏览：{detailInfor.watchCount}</span>
              <span>评论：{detailInfor.remarkGroup && detailInfor.remarkGroup.length}</span>
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
          {firstStatus != 2 && <div className="btn-box">
            {status == 0 && <Button type="primary" style={{ marginRight: 20 }} onClick={this.addIntoShoppingCar}>添加购物车</Button>}
            {status == 1 && <Button type="primary" disabled style={{ marginRight: 20 }}>已添加购物车</Button>}
            {status != 2 && <Button onClick={this.showNotice} type="primary">阅读更多</Button>}
          </div>}

          <Divider orientation="left" style={{ fontSize: 20 }}>评论</Divider>

          {isTextAreaShow && <TextArea placeholder="请输入评论" rows={5} style={{ marginBottom: '35px', padding: '10px 15px' }} value={textareaValue}  onChange={this.handleTextareaChange} />}
          <div className="reamrk-btn-box">
            {!isTextAreaShow && <Button type="primary" onClick={this.showTextarea} disabled={status != 2 && firstStatus != 2}>发布评论</Button>}
            {isTextAreaShow && <Button type="primary" onClick={this.addRemark}>发布</Button>}
          </div>

          <List
            style={{ padding: '20px 0px', width: '100%' }}
            className="comment-list"
            itemLayout="horizontal"
            dataSource={remarkData.length > 0 ?remarkData : [1]}
            renderItem={(item) => {
              let realUrl = item.userHp ? require(`assets/imgs/user/${item.userHp}`) : '';
              let actions = [];
              if (item._id) {
                actions = this.props.userData.postRemarks.indexOf(item._id) != -1 ? [<IconText type="like-o" text={item.support} callback={this.handleOperateRemark.bind(this,'support',item)} />, <IconText callback={this.handleOperateRemark.bind(this,'against',item)} type="dislike-o" text={item.against} />, <IconText callback={this.handleOperateRemark.bind(this,'delete',item)} type="delete" />] : [<IconText type="like-o" callback={this.handleOperateRemark.bind(this,'support',item)} text={item.support} />, <IconText type="dislike-o" callback={this.handleOperateRemark.bind(this,'against',item)} text={item.against} />];
              }
              return remarkData.length > 0 ?  (
                <Comment
                  author={item.userName}
                  avatar={(<Avatar
                    src={realUrl}
                    alt="userHeadPic"
                  />)}
                  content={item.content}
                  datetime={item.date}
                  actions={actions}
                />
              ) : <Empty style={{ padding: '50px 0px' }} description={'暂无评论'} />;
            }}
          />
          {/* <Pagination style={{ marginTop: 20 }} defaultCurrent={1} total={total} /> */}
        </div>
        <Modal
          title="确认订单并支付"
          visible={visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row getter={16}>
            <Col style={{ textAlign: 'right' }} span={6}>本次订单包括：</Col>
            <Col span={16}>
              {detailInfor.title}
            <br /><span>总计：{detailInfor.payCorn}</span></Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col style={{ textAlign: 'right' }} span={6}>支付密码：</Col>
            <Col span={16}>
              <Input onChange={this.handleInputChange} value={password} placeholder="请输入支付密码" type="password" />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
 