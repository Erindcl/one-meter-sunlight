import React, { Component } from "react";
import { Upload, Form, Input, Row, Col, Button } from 'antd';
import "./style.scss";
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class AllInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      // API.updateUserInfor({
      //   userId: this.props.userData._id,
      //   headPic: 'xxx',
      //   bgPic: 'xxx',
      //   userName: values.name,
      //   password: values.password,
      //   intro: values.intro,
      // }).then(response =>{ 
      //   const { success, message, data } = response;
      //   if (success) {
      //     console.log(data);
      //   } else {
      //     Message.error(message);
      //   }
      // });
      console.log('values:', values);
      Message.success('修改成功');
    });
  };

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      Message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const { userData }=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 12,
      },
    };

    let realUBP = require(`assets/imgs/user/${userData.bgPic}`);
    let realHP = require(`assets/imgs/user/${userData.headPic}`);
    return (
      <div className="all-infor">
        <Form>
          <Row className="form-item">
            <Col span="20">
              <FormItem label="背景图片：" {...formItemLayout}>
                <Upload
                  name="bgPic"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  <img style={{ height: 200, width: 300 }} src={realUBP} alt="bgPic" />
                </Upload>
              </FormItem>
            </Col>
          </Row>

          
          <Row className="form-item">
            <Col span="20">
              <FormItem label="头像：" {...formItemLayout}>
                <Upload
                  name="headPic"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  <img style={{ height: 150, width: 150 }} src={realHP} alt="headPic" />
                </Upload>
              </FormItem>
            </Col>
          </Row>

          <Row className="form-item">
            <Col span="20">
              <FormItem label="昵称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: userData.name,
                  rules: [{
                    required: true, message: '必填项',
                  }],
                })(
                  <Input placeholder="请输入昵称" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row className="form-item">
            <Col span="20">
              <FormItem label="邮件" {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: userData.email,
                  rules: [{
                    required: true, message: '请输入正确的邮箱', 
                    type: 'email'
                  }],
                })(
                  <Input disabled={true} placeholder="请输入邮箱" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row className="form-item">
            <Col span="20">
              <FormItem label="密码" {...formItemLayout}>
                {getFieldDecorator('password', {
                  initialValue: userData.password,
                  rules: [{
                    required: true, message: '必填项'
                  }],
                })(
                  <Input type="password" placeholder="请重新输入新密码" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row className="form-item">
            <Col span="20">
              <FormItem label="简介" {...formItemLayout}>
                {getFieldDecorator('intro', {
                  initialValue: userData.intro,
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row style={{ marginLeft: 30 }}>
          <Col offset="1">
            <Button
              type="primary"
              onClick={this.handleSubmit}
            >
              保存更改
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AllInfor);
