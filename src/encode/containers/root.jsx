import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Root extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <div title="笑斌的个人世界">
        233
      </div>
    );
  }
}

export default connect(state => state)(Root);
