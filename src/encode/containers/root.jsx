import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Layout from 'components/layout/index';
import TagList from './TagList';
import qs from 'qs';

import { Input, Select, Form, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

import { Base64 } from 'js-base64';

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
    checked: false,
  },
  {
    id: '7',
    text: 'query解析',
    command: 'queryParse',
    checked: false,
  },
  {
    id: '8',
    text: 'query序列化',
    command: 'queryStringify',
    checked: false,
  },
  {
    id: '3',
    text: 'Base64编码',
    command: 'base64encode',
    checked: true,
  },
  {
    id: '4',
    text: 'Base64解码',
    command: 'base64decode',
    checked: false,
  },
  {
    id: '5',
    text: 'md5加密',
    command: 'md5',
    checked: false,
  },
  {
    id: '6',
    text: 'sha1加密',
    command: 'sha1',
    checked: false,
  }
];

const commandList = {
  'encodeURI': window.encodeURI,
  'decodeURI': window.decodeURI,
  'base64encode': Base64.encode,
  'base64decode': Base64.decode,
  'queryParse': (val) => {
    return JSON.stringify(qs.parse(val), null, 2);
  },
  'queryStringify': (val) => {
    if (typeof val === 'string') {
      return val;
    }
    return qs.stringify(val);
  },
  'md5': window.md5,
  'sha1': window.sha1,
};

class Root extends Component {
  constructor(props) {
    super(props);
    const initialExcuteList = encodeList.filter(commandItem => commandItem.checked === true);
    this.state = {
      excuteList: initialExcuteList,
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

  excuteCommandAndOutputResult(inputValue) {
    const excuteCommandResult = {};

    this.state.excuteList.forEach(command => {
      try {
        excuteCommandResult[command.id] = commandList[command.command](inputValue);
      } catch (e) {
        console.log(e);
      }
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
      <Layout current="1">
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
              />
            )}
          </FormItem>
        </Form>

        <div className="input-label">
          执行的命令列表
        </div>
        <TagList
          onChange={this.changeExcuteCommand}
          datasource={encodeList}
        />
        <hr />

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
