import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Layout from 'components/layout/index';
class Root extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <Layout>
        2333
      </Layout>
    );
  }
}

export default connect(state => state)(Root);
