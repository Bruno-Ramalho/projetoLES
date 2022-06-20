import {
  CUPOM_DETAILS_FAIL,
  CUPOM_DETAILS_REQUEST,
  CUPOM_DETAILS_SUCCESS,
  CUPOM_LIST_FAIL,
  CUPOM_LIST_REQUEST,
  CUPOM_LIST_SUCCESS,
  CUPOM_REGISTER_FAIL,
  CUPOM_REGISTER_REQUEST,
  CUPOM_REGISTER_SUCCESS
} from "../constants/cupomConstants";


export const registerCupomReducer = (state = {}, action) => {
  switch (action.type) {
    case CUPOM_REGISTER_REQUEST:
      return { loading: true };
    case CUPOM_REGISTER_SUCCESS:
      return { loading: false, cupom: action.payload };
    case CUPOM_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const listCupomReducer = (state = { loading: true, cupom: [] }, action) => {
  switch (action.type) {
    case CUPOM_LIST_REQUEST:
      return { loading: true };
    case CUPOM_LIST_SUCCESS:
      return { loading: false, cupom: action.payload };
    case CUPOM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const detailsCupomReducer = (state = { cupom: {}, loading: false }, action) => {
  switch (action.type) {
    case CUPOM_DETAILS_REQUEST:
      return { loading: true };
    case CUPOM_DETAILS_SUCCESS:
      return { loading: false, cupom: action.payload };
    case CUPOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}