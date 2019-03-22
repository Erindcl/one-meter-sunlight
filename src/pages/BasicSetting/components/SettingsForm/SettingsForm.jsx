/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { Card, Form, Input, Row, Col, Button, message, Radio, Upload, Icon } from 'antd';
import './SettingsForm.scss';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
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

class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      message.success('提交成功');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 11,
      },
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    
    return (
      <div className="settings-form">
        <Card>
          <Form>
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>基本设置</h2>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="姓名：" {...formItemLayout}>
                    {getFieldDecorator('name', {
                      rules: [{
                        required: true, message: '必填项',
                      }],
                    })(
                      <Input size="large" placeholder="请输入用户名" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="姓名：" {...formItemLayout}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="//jsonplaceholder.typicode.com/posts/"
                      beforeUpload={beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="性别：" {...formItemLayout}>
                    {getFieldDecorator('gender', {
                      rules: [{
                        required: true, message: '必填项',
                      }],
                    })(
                      <RadioGroup>
                        <Radio value={'male'}>男</Radio>
                        <Radio value={'female'}>女</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="邮箱：" {...formItemLayout}>
                    {getFieldDecorator('email', {
                      rules: [{
                        required: true, message: '请输入正确的邮箱', type: 'email'
                      }],
                    })(
                      <Input size="large" placeholder="请输入邮箱" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="website：" {...formItemLayout}>
                    {getFieldDecorator('siteUrl', {
                      rules: [{
                        required: true, message: '请输入正确的网站地址', type: 'url'
                      }],
                    })(
                      <Input size="large" placeholder="请输入网站地址" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="Github：" {...formItemLayout}>
                    {getFieldDecorator('githubUrl', {
                      rules: [{
                        required: true, message: '请输入正确的 Github 地址', type: 'url'
                      }],
                    })(
                      <Input size="large" placeholder="请输入Github地址" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="Twitter：" {...formItemLayout}>
                    {getFieldDecorator('twitterUrl', {
                      rules: [{
                        required: true, message: '请输入正确的 Twitter 地址', type: 'url'
                      }],
                    })(
                      <Input size="large" placeholder="请输入Twitter地址" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="自我描述：" {...formItemLayout}>
                    {getFieldDecorator('description', {})(
                      <Input.TextArea placeholder="请输入自我描述">
                      </Input.TextArea>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Form>

          <Row style={{ marginTop: 20 }}>
            <Col offset="1">
              <Button
                type="primary"
                style={{ width: 100 }}
                onClick={this.handleSubmit}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Form.create()(SettingsForm);

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
