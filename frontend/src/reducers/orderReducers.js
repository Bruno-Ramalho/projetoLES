import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
  ORDER_CHANGE_STATUS_FAIL,
  ORDER_CHANGE_STATUS_SUCCESS,
  ORDER_CHANGE_STATUS_REQUEST,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_GRAPH_REQUEST,
  ORDER_GRAPH_SUCCESS,
  ORDER_GRAPH_FAIL,
  ORDER_DETAILS_CREATE_REQUEST,
  ORDER_DETAILS_CREATE_SUCCESS,
  ORDER_DETAILS_CREATE_FAIL
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_CREATE_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_CREATE_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUserListReducer = (state = { orders: [], loading: true }, action) => {
  switch (action.type) {
    case ORDER_USER_LIST_REQUEST:
      return { loading: true };
    case ORDER_USER_LIST_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const orderDetailsReducer = (state = { order: [], loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderChangeStatusReducer = (state = { order: {}, loading: true }, action) => {
  switch (action.type) {
    case ORDER_CHANGE_STATUS_REQUEST:
      return { loading: true };
    case ORDER_CHANGE_STATUS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_CHANGE_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const orderListReducer = (state = { orders: [], loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const orderGraphReducer = (state = { graph: [], loading: true }, action) => {
  switch (action.type) {
    case ORDER_GRAPH_REQUEST:
      return { loading: true };
    case ORDER_GRAPH_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_GRAPH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}