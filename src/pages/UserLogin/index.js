import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import { API } from "@/api/index.js";
import { message as Message } from 'antd';
import localDb from '@/utils/localDb.js';

class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      API.userLogin(values).then(response =>{ 
        const { success, message, data } = response;
        if (success) {
          message.success('登录成功');
          localDb.set('email',data.email);
          if (data.type == 'admin') {
            this.props.history.push('/dashboard/monitor');
          } else {
            this.props.history.push('/');
          }
        } else {
          Message.error(message);
        }
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
          <Form>
            <div style={styles.formItems}>
              <Form.Item style={styles.formItem}>
                {getFieldDecorator('email', {
                  rules: [{
                    required: true, message: '请输入邮箱',
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
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码',
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

            <div style={styles.formItem}>
              <Checkbox style={styles.checkbox}>记住账号</Checkbox>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/register" style={styles.tips}>
                立即注册
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

export default Form.create()(UserLogin);
