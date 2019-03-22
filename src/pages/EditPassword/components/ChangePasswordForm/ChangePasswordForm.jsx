/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Card, Form, Input, Row, Col, Button, message } from 'antd';
import './ChangePasswordForm.scss';

const FormItem = Form.Item;

class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  handleConfirmPassword = (rule, values, callback) => {
    if (values && values !== getFieldValue('newPassword')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      message.success('修改成功');
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
    return (
      <div className="change-password-form">
        <Card>
          <Form>
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>修改密码</h2>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="新密码：" {...formItemLayout}>
                    {getFieldDecorator('newPassword', {
                      rules: [{
                        required: true, message: '必填项'
                      }],
                    })(
                      <Input size="large" type="password" placeholder="请重新输入新密码" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="15">
                  <FormItem label="确认密码：" {...formItemLayout}>
                    {getFieldDecorator('passwordConfirm', {
                      rules: [{
                        required: true, message: '必填项'
                      }, {
                        validator: this.handleConfirmPassword
                      }],
                    })(
                      <Input size="large" type="password" type="password" placeholder="请再次输入以确认新密码" />
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
                onClick={this.validateAllFormField}
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

export default Form.create()(ChangePasswordForm);

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
