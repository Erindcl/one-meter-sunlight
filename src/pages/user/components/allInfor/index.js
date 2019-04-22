import React, { Component } from "react";
import { Upload, Form, Input, Row, Col, Button, message } from 'antd';
import "./style.scss";
const FormItem = Form.Item;
const { TextArea } = Input;

class AllInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allInfor: {
        bgPic: require('assets/imgs/t6.jpg'),
        headPic: require('assets/imgs/t7.jpg'),
        email: 'XXX@163.com',
        name: 'XXX',
        password: '123456',
        intro: 'XXX',
      }
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

      console.log('values:', values);
      message.success('添加成功');
    });
  };

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const { allInfor }=this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 12,
      },
    };
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
                  <img style={{ height: 200, width: 300 }} src={allInfor.bgPic} alt="bgPic" />
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
                  <img style={{ height: 150, width: 150 }} src={allInfor.headPic} alt="headPic" />
                </Upload>
              </FormItem>
            </Col>
          </Row>

          <Row className="form-item">
            <Col span="20">
              <FormItem label="昵称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: allInfor.name,
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
                  initialValue: allInfor.email,
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
                  initialValue: allInfor.password,
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
                  initialValue: allInfor.intro,
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
