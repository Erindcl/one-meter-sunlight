/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message, Icon } from 'antd';

class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('newPassword')) {
        callback('两次输入不一致！')
    }
    callback()
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      message.success('注册成功');
      this.props.history.push('/login');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>注 册</h4>
        <Form>
          <div style={styles.formItems}>
            <Form.Item style={styles.formItem}>
              {getFieldDecorator('username', {
                rules: [{
                  required: true, message: '请输入正确的用户名',
                }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  maxLength={20}
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              )}
            </Form.Item>

            <Form.Item style={styles.formItem}>
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入正确的邮箱', type: 'email'
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  maxLength={20}
                  placeholder="邮箱"
                  style={styles.inputCol}
                />
              )}
            </Form.Item>

            <Form.Item style={styles.formItem}>
              {getFieldDecorator('newPassword', {
                rules: [{
                  validator: this.checkPasswd
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  type="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              )}
            </Form.Item>

            <Form.Item style={styles.formItem}>
              {getFieldDecorator('passwordConfirm', {
                rules: [{
                  required: true,
                  message: '请再次输入以确认新密码',
                }, {
                      validator: this.handleConfirmPassword
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  type="password"
                  placeholder="确认密码"
                  style={styles.inputCol}
                />
              )}
            </Form.Item>

            <div className="footer">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                size="large"
              >
                注 册
              </Button>
              <Link to="/login" style={styles.tips}>
                使用已有账户登录
              </Link>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default Form.create()(UserRegister);
