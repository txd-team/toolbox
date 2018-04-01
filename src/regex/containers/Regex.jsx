import React, { Component } from 'react';
import { List } from 'antd';

import './Regex.scss';

export default class TagList extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    item: {},
  }

  render() {
    const { item } = this.props;
    let value = item.value;
    if (typeof item.value === 'object') {
      value = item.value.toString();
    }
    return (
      <List.Item actions={[<a target="_blank" href={`https://jex.im/regulex/#!flags=&re=${encodeURIComponent(value)}`}>详情</a>]}>
        <List.Item.Meta
          title={item.name}
        />
        <div className="regex-string">
          <code>{value}</code>
        </div>
      </List.Item>
    );
  }
}