import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Layout from 'components/layout/index';
import TagList from './TagList';

import { Input, Select, Form, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const convertList = [
  {
    id: '1',
    text: '二进制',
    command: '2',
    checked: true,
  },
  {
    id: '2',
    text: '八进制',
    command: '8',
    checked: true,
  },
  {
    id: '3',
    text: '十进制',
    command: '10',
    checked: true,
  },
  {
    id: '4',
    text: '16进制',
    command: '16',
    checked: true,
  }
];

function transform(src, srcRadix, destRadix) {
  return parseInt(src, srcRadix).toString(destRadix);
}

class Root extends Component {
  constructor(props) {
    super(props);
    const initialExcuteList = convertList.filter(commandItem => commandItem.checked === true);
    this.state = {
      currentRadix: 10,
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

  onRadixChange = (currentRadix) => {
    this.setState({
      currentRadix
    });
  }

  onValueChange = (e) => {
    const inputValue = e.target.value;
    this.excuteCommandAndOutputResult(inputValue);
  }

  excuteCommandAndOutputResult(inputValue) {
    const excuteCommandResult = {};
    const { currentRadix } = this.state;

    this.state.excuteList.forEach(command => {
      try {
        excuteCommandResult[command.id] = transform(inputValue, currentRadix, command.command);
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
    const { currentRadix } = this.state;
    const options = convertList.map(d => <Option key={d.command}>{d.text}</Option>)
    return (
      <Layout current="4">
        <div className="input-label">
          原始进制
          <Select defaultValue={'十进制'} style={{ margin: 12 }} size="small" onChange={this.onRadixChange}>
            {
              options
            }
          </Select>
          <Button type="danger" size="small" onClick={this.onInputSubmit}>开始转换</Button>
        </div>
        <Form>
          <FormItem>
            {getFieldDecorator('inputValue', {
              rules: [{ required: true, message: 'Please input something to excute' }],
            })(
              <Input
                placeholder="Please input anything to convert"
              />
            )}
          </FormItem>
        </Form>

        <div className="input-label">
          目标进制
        </div>
        <TagList
          onChange={this.changeExcuteCommand}
          datasource={convertList}
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
