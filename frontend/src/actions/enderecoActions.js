import Axios from "axios";
import {
  END_REGISTER_FAIL,
  END_REGISTER_REQUEST,
  END_REGISTER_SUCCESS,
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
  END_REMOVE_FAIL
} from "../constants/endConstants"
import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const registerAddress = (apelido, id, address, city, postalCode, state, numero, bairro, token) => async (dispatch) => {
  dispatch({ type: END_REGISTER_REQUEST, payload: { apelido, id, address, city, postalCode, state, numero, bairro } });
  try {
    const { data } = await Axios.post('/api/address/cadastrar', {
      apelido, usuario: { id }, address, city, postalCode, state, numero, bairro
    }, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: END_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("address", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: END_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  dispatch({ type: END_REQUEST, payload: id });
  try {
    const { data } = await Axios.get(`/api/address/apelido/${apelido}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: END_REQUEST_FAIL,
      payload: error.message
    });
  }
};

export const enderecosUsuario = (idUsuario, token) => async (dispatch) => {
  dispatch({ type: END_REQUEST, payload: idUsuario });
  try {
    const { data } = await Axios.get(`/api/address/${idUsuario}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: END_REQUEST_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: END_REQUEST_FAIL,
      payload: error.message
    });
  }
};

export const detailsAddress = (id, token) => async (dispatch) => {
  dispatch({ type: END_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await Axios.get(`/api/address/endereco/${id}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: END_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: END_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateAddress = (apelido, id, address, city, postalCode, state, numero, bairro, token) => async (dispatch) => {
  dispatch({ type: END_UPDATE_REQUEST, payload: { apelido, id, address, city, postalCode, state, numero, bairro } });
  try {
    const { data } = await Axios.put(`/api/address/update/${id}`, {
      apelido, usuario: { id }, address, city, postalCode, state, numero, bairro
    }, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: END_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: END_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const removeAddress = (id, token) => async (dispatch) => {
  dispatch({ type: END_REMOVE_REQUEST, payload: id });
  try {
    const { data } = await Axios.delete(`/api/address/delete/${id}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: END_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: END_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}