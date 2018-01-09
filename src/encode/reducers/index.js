'use strict';

import * as actions from '../actions/index';

// 对页面prop 数据进行管理
const initialState = {

};
const defaultAction = {
  type: 'doNothing'
};

export default function index(state = initialState, action = defaultAction) {
  switch (action.type) {
    default:
      return state;
  }
}
