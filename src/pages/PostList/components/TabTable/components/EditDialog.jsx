import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    this.props.form.setFieldsValue({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button type="primary" onClick={() => this.onOpen(record, index)}>
          编辑
        </Button>
        <Modal
          title="编辑"
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.onClose}
          okText="确认"
          cancelText="取消"
        >
          <Form>
            <FormItem label="标题：" {...formItemLayout}>
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '必填选项',
                }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="作者：" {...formItemLayout}>
              {getFieldDecorator('author', {
                rules: [{
                  required: true, message: '必填选项',
                }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="状态：" {...formItemLayout}>
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '必填选项',
                }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="发布时间：" {...formItemLayout}>
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '必填选项',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EditDialog)

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
