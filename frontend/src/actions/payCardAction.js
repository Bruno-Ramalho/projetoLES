import Axios from "axios";
import {
  PAYCARD_DETAILS_FAIL,
  PAYCARD_DETAILS_REQUEST,
  PAYCARD_DETAILS_SUCCESS,
  PAYCARD_LIST_FAIL,
  PAYCARD_LIST_REQUEST,
  PAYCARD_LIST_SUCCESS,
  PAYCARD_REGISTER_FAIL,
  PAYCARD_REGISTER_REQUEST,
  PAYCARD_REGISTER_SUCCESS,
  PAYCARD_REMOVE_FAIL,
  PAYCARD_REMOVE_REQUEST,
  PAYCARD_REMOVE_SUCCESS
} from "../constants/payCardConstants"
import { CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";


export const registerPayCard = (id, bandeira, number, cardHolderName, cvc, dueData, token) => async (dispatch) => {
  dispatch({ type: PAYCARD_REGISTER_REQUEST, payload: { id, bandeira, number, cardHolderName, cvc, dueData } });
  try {
    const { data } = await Axios.post('/api/cards/cadastrar', {
      usuario: { id }, bandeira, number, cardHolderName, cvc, dueData
    }, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: PAYCARD_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("payCardInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PAYCARD_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  dispatch({ type: PAYCARD_LIST_REQUEST, payload: id });
  try {
    const { data } = await Axios.get(`/api/cards/number/${number}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem('savePaymentMethod', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PAYCARD_LIST_FAIL,
      payload: error.message
    });
  }
};

export const listPayCardsUsuario = (idUsuario, token) => async (dispatch) => {
  dispatch({ type: PAYCARD_LIST_REQUEST, payload: idUsuario });
  try {
    const { data } = await Axios.get(`/api/cards/${idUsuario}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: PAYCARD_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYCARD_LIST_FAIL,
      payload: error.message
    });
  }
};

export const detailsPayCard = (id, token) => async (dispatch) => {
  dispatch({ type: PAYCARD_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await Axios.get(`/api/cards/cartao/${id}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: PAYCARD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYCARD_DETAILS_FAIL,
      payload: error.message
    });
  }
};

export const removePayCard = (id, token) => async (dispatch) => {
  dispatch({ type: PAYCARD_REMOVE_REQUEST, payload: id });
  try {
    const { data } = await Axios.delete(`/api/cards/delete/${id}`, {
      headers: {
        authorization: "Bearer " + token
      }
    });
    dispatch({ type: PAYCARD_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYCARD_REMOVE_FAIL,
      payload: error.message
    });
  }
};