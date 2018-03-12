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
    text: 'HEX颜色',
    command: 'HEX',
    checked: true,
  },
  {
    id: '2',
    text: 'RGB颜色/RGBA颜色',
    command: 'RGB',
    checked: true,
  },
  {
    id: '3',
    text: 'RGB百分比颜色/RGBA百分比颜色',
    command: 'RGBPercent',
    checked: true,
  }
];

const commandList = {
  HEX: (color) => window.tinycolor(color).toHexString(),
  RGB: (color) => window.tinycolor(color).toRgbString(),
  RGBPercent: (color) => window.tinycolor(color).toPercentageRgbString(),
};

class Root extends Component {
  constructor(props) {
    super(props);
    const initialExcuteList = convertList.filter(commandItem => commandItem.checked === true);
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
      <Layout current="2">
        <div className="input-label">
          输入任何种类的颜色进行转换 <Button type="danger" size="small" onClick={this.onInputSubmit}>开始转换</Button>
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
          执行的命令列表
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
