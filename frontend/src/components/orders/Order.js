import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder } from '../../actions/orderActions';
import { useHistory } from "react-router-dom"

export default function Order(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token
  const { order } = props;
  let history = useHistory();

  const dispatch = useDispatch();
  const detailsOrderHandler = () => {
    dispatch(detailsOrder(order.id, token))
    history.push(`/order/${order.id}`);
  }

  return (
    <div key={order.id} className="card">
      <p className="medium">{order.status}</p>
      <div className="card-body">
        <h2>{order.dataPedido}</h2>
        <div className="price">R${order.totalPrice}</div>
        <button onClick={detailsOrderHandler}>Acessar</button>
      </div>
    </div>
  );
}