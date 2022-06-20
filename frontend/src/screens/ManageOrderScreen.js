import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userListOrder } from '../actions/orderActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';
import Order from '../components/orders/Order';

export default function ManageOrderScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token

  const ListOrder = useSelector((state) => state.ListOrder);
  const { order, loading, error } = ListOrder;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userListOrder(userInfo.id, token))
  }, [dispatch, userInfo.id, token])

  return (
    <div>
      <Link to="/usuarios">Retornar</Link>
      <h1>Pedidos</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <div className="row center">
          {order.map((order) => (
            <Order key={order.id} order={order}></Order>
          ))}
        </div>
      )}
    </div>
  )
}