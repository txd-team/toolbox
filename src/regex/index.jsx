import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/index';
import reducers from './reducers/index';

import Root from './containers/root';

import './index.scss';

const store = createStore(reducers);

ReactDom.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('container'));
