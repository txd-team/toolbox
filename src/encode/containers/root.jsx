import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Layout from 'components/layout/index';
import TagList from './TagList';

import { Input, Select, Form, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const encodeList = [
  {
    id: '1',
    text: 'URL编码',
    command: 'encodeURI',
    checked: true,
  },
  {
    id: '2',
    text: 'URL解码',
    command: 'decodeURI',
    checked: true,
  },
];

const commandList = {
  'encodeURI': window.encodeURI,
  'decodeURI': window.decodeURI,
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excuteList: encodeList,
      excuteCommandResult: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  onInputSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const inputValue = values.inputValue;
        this.excuteCommandAndOutputResult(inputValue);
      } else {
        console.log(err);
      }
    })
  }

  onValueChange = (e) => {
    const inputValue = e.target.value;
    this.excuteCommandAndOutputResult(inputValue);
  }

  excuteCommandAndOutputResult = (inputValue) => {
    const excuteCommandResult = {};

    this.state.excuteList.forEach(command => {
      excuteCommandResult[command.id] = commandList[command.command](inputValue);
    });

    this.setState({
      excuteCommandResult,
    });
  }

  changeExcuteCommand = (checkStatus) => {
    this.setState({
      excuteList: checkStatus,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <div className="input-label">
          输入 <Button type="danger" size="small" onClick={this.onInputSubmit}>执行命令</Button>
        </div>
        <Form>
          <FormItem>
            {getFieldDecorator('inputValue', {
              rules: [{ required: true, message: 'Please input something to excute' }],
            })(
              <TextArea
                placeholder="Please input to encode"
                autosize={{ minRows: 2, maxRows: 6 }}
                onPressEnter={this.onValueChange}
              />
              )}
          </FormItem>
        </Form>

        <TagList
          onChange={this.changeExcuteCommand}
          datasource={encodeList}
        />

        <div className="input-label">输出</div>
        {
          this.state.excuteList.map((excuteCommandBox) => {
            return (
              <div className="output-box">
                <div className="input-label">{excuteCommandBox.text}</div>
                <TextArea
                  value={this.state.excuteCommandResult[excuteCommandBox.id]}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              </div>
            )
          })
        }
      </Layout>
    );
  }
}

const wrappedRoot = Form.create()(Root);

export default connect(state => state)(wrappedRoot);
