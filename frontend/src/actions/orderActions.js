import Axios from "axios";
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CHANGE_STATUS_REQUEST,
  ORDER_CHANGE_STATUS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_CREATE_FAIL,
  ORDER_DETAILS_CREATE_REQUEST,
  ORDER_DETAILS_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_GRAPH_FAIL,
  ORDER_GRAPH_REQUEST,
  ORDER_GRAPH_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
} from '../constants/orderConstants';
import { createCupom, inactiveCupom } from './cupomActions';


export const createOrder = (shippingAddressId, payCardId, cartItems, userId, itemsPrice, totalPrice, taxPrice, token, cupomId) => async (dispatch) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: {
      usuario:
      {
        id: userId
      },
      cartao: {
        id: payCardId
      },
      endereco:
      {
        id: shippingAddressId
      },
      produtos: cartItems,
      taxPrice,
      totalPrice,
      itemsPrice
    }
  });
  try {
    const { data } = await Axios.post('/api/orders', {
      usuario:
      {
        id: userId
      },
      cartao: {
        id: payCardId
      },
      endereco:
      {
        id: shippingAddressId
      },
      produtos: cartItems,
      taxPrice,
      totalPrice,
      itemsPrice
    }
      , {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    dispatch(createDetailsOrder(cartItems[0].id, cartItems[0].qty, token));
    //dispatch({ type: CART_EMPTY });
    //localStorage.removeItem('cartItems');
    if (cupomId) {
      dispatch(inactiveCupom(cupomId, token));
      if (totalPrice < 0) {
        dispatch(createCupom(userId, token, (totalPrice * -1)))
      }
    }
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
};

export const createDetailsOrder = (prodId, qty, token) => async (dispatch) => {
  dispatch({
    type: ORDER_DETAILS_CREATE_REQUEST,
    payload: {
      produto: {
        prodId
      },
      quantity: qty
    }
  })
  try {
    const { data } = await Axios.post('/api/orderDetails/cadastrar', {
      produto: {
        prodId
      },
      quantity: qty
    }
      , {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    dispatch({ type: ORDER_DETAILS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const userListOrder = (userId, token) => async (dispatch) => {
  dispatch({ type: ORDER_USER_LIST_REQUEST, payload: userId });
  try {
    const { data } = await Axios.get(`/api/orders/${userId}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({
      type: ORDER_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const listOrder = (admin, token) => async (dispatch) => {
  if (admin === true) {
    dispatch({ type: ORDER_LIST_REQUEST, payload: admin });
    try {
      const { data } = await Axios.get(`/api/orders`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    }
    catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    alert("Você não possui os privilégios para realizar esta ação!");
  }
}

export const graphOrder = (admin, token) => async (dispatch) => {
  if (admin === true) {
    dispatch({ type: ORDER_GRAPH_REQUEST, payload: admin });
    try {
      const { data } = await Axios.get(`/api/orderDetails/trazertodos`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      dispatch({ type: ORDER_GRAPH_SUCCESS, payload: data });
    }
    catch (error) {
      dispatch({
        type: ORDER_GRAPH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    alert("Você não possui os privilégios para realizar esta ação!");
  }
}

export const detailsOrder = (orderId, token) => async (dispatch) => {
  const produtos = [];
  const quantidade = [];
  const pedido = [];
  const info = [];
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const { data } = await Axios.get(`/api/orderDetails/pedido/${orderId}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    for (var i = 0; i < data.length; i++) {
      quantidade[i] = data[i].quantity;
      produtos[i] = data[i].produto;
    };
    for (var i = 0; i < produtos.length; i++) {
      produtos[i].quantity = quantidade[i];
    };
    pedido[0] = data[0].pedido;
    info[0] = produtos;
    info[1] = pedido;
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: info });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const changeOrderStatus = (id, token, STATUS, price, userId) => async (dispatch) => {
  switch (STATUS) {
    case "APROVADO":
      console.log(token)
      dispatch({ type: ORDER_CHANGE_STATUS_REQUEST, payload: id });
      try {
        const { data } = await Axios.patch(`/api/orders/${id}/aprovado`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );
        dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
      }
      break;
    case "ENVIADO":
      dispatch({ type: ORDER_CHANGE_STATUS_REQUEST, payload: id });
      try {
        const { data } = await Axios.patch(`/api/orders/${id}/enviado`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );
        dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
      }
      break;
    case "ENTREGUE":
      dispatch({ type: ORDER_CHANGE_STATUS_REQUEST, payload: id });
      try {
        const { data } = await Axios.patch(`/api/orders/${id}/entregue`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );
        dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
      }
      break;
    case "DEVOLUÇÃO_PENDENTE":
      dispatch({ type: ORDER_CHANGE_STATUS_REQUEST, payload: id });
      try {
        const { data } = await Axios.patch(`/api/orders/${id}/devolucaopendente`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );
        dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
      }
      break;
    case "DEVOLVIDO":
      dispatch({ type: ORDER_CHANGE_STATUS_REQUEST, payload: id });
      try {
        const { data } = await Axios.patch(`/api/orders/${id}/devolvido`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );
        dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
      }
      dispatch(createCupom(userId, token, price));
      break;
    default:

      return null
  }
}