import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Collapse  } from 'antd';

const Panel = Collapse.Panel;

import Layout from 'components/layout/index';
import * as actions from '../actions/index';
import regexList from '../data';
import TagList from './TagList';
import RegexItem from './Regex';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  renderList() {
    return <Collapse defaultActiveKey={['0', '1']}>
      {
        regexList.map((listItem, index) =>
        <Panel header={listItem.name} key={index}>
          <div className="regex-list">
          {
            listItem.value.map(item => <RegexItem item={item} />)
          }
          </div>
        </Panel>
        )
      }
       
    </Collapse>
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const text = 1;
    return (
      <Layout current="3">
        <div className="input-label">
          快捷通道：
          <Button href="https://regexr.com/" target="_blank" type="danger" size="small">
            验证工具
          </Button>
          <Button href="https://github.com/zeeshanu/learn-regex/blob/master/README-cn.md" target="_blank" type="primary" size="small">
            快速入门
          </Button>
        </div>
        {
          this.renderList()
        }
      </Layout>
    );
  }
}

const wrappedRoot = Form.create()(Root);

export default connect(state => state)(wrappedRoot);
