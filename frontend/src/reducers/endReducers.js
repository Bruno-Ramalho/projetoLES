import {
  END_REGISTER_REQUEST,
  END_REGISTER_SUCCESS,
  END_REGISTER_FAIL,
  END_REQUEST,
  END_REQUEST_SUCESS,
  END_REQUEST_FAIL,
  END_DETAILS_REQUEST,
  END_DETAILS_SUCCESS,
  END_DETAILS_FAIL,
  END_UPDATE_REQUEST,
  END_UPDATE_SUCCESS,
  END_UPDATE_FAIL,
  END_REMOVE_REQUEST,
  END_REMOVE_SUCCESS,
  END_REMOVE_FAIL,
} from "../constants/endConstants";

export const endRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case END_REGISTER_REQUEST:
      return { loading: true };
    case END_REGISTER_SUCCESS:
      return { loading: false, endInfo: action.payload };
    case END_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const endListReducer = (state = { loading: true, address: [] }, action) => {
  switch (action.type) {
    case END_REQUEST:
      return { loading: true };
    case END_REQUEST_SUCESS:
      return { loading: false, address: action.payload };
    case END_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const endDetailsReducer = (state = { loading: true, userAddress: {} }, action) => {
  switch (action.type) {
    case END_DETAILS_REQUEST:
      return { loading: true };
    case END_DETAILS_SUCCESS:
      return { loading: false, userAddress: action.payload };
    case END_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const endUpdateReducer = (state = { loading: true, userAddress: {} }, action) => {
  switch (action.type) {
    case END_UPDATE_REQUEST:
      return { loading: true };
    case END_UPDATE_SUCCESS:
      return { loading: false, userAddress: action.payload };
    case END_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const endRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case END_REMOVE_REQUEST:
      return { loading: true };
    case END_REMOVE_SUCCESS:
      return { loading: false, address: action.payload };
    case END_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


