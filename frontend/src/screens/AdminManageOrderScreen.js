import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrder } from '../actions/orderActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';
import Order from '../components/orders/Order';

export default function AdminManageOrderScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token

  const allOrder = useSelector((state) => state.allOrder);
  const { order, loading, error } = allOrder;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listOrder(userInfo.admin, token))
  }, [dispatch, userInfo.admin, token])

  return (
    <div>
      <Link to="/admin">Retornar</Link>
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