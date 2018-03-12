import React, { Component } from 'react';
import { Tag } from 'antd';
import './TagList.scss';

const { CheckableTag } = Tag;

export default class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: props.datasource
    };
  }

  static defaultProps = {
    onChange: () => { },
    datasource: [],
  }

  changeChecked(id, status) {
    const datasource = [...this.state.datasource];
    const target = datasource.filter(commandItem => commandItem.id === id)[0];

    if (target) {
      target.checked = status;
      this.setState({
        datasource,
      });

      const checkedCommands = datasource.filter(commandItem => commandItem.checked === true);
      this.props.onChange(checkedCommands);
    }
  }

  render() {
    return (
      <div className="command-tag-list">
        {
          this.state.datasource.map((commandItem) => {
            return (
              <CheckableTag
                key={commandItem.id}
                checked={commandItem.checked}
                onChange={(status) => { this.changeChecked(commandItem.id, status) }}
              >
                {commandItem.text}
              </CheckableTag>
            );
          })
        }
      </div>
    );
  }
}