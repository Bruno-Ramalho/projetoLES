import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { Link } from "react-router-dom";
import { createDetailsOrder, createOrder, userListOrder } from "../actions/orderActions";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import { useEffect } from "react";

export default function OrderThanksScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const ListOrder = useSelector((state) => state.ListOrder);
  const { order, loading, error } = ListOrder;


  const [lastOrder, setLOrder] = useState(null);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userListOrder(userInfo.id, userInfo.token));
  }, [dispatch, userInfo.id, userInfo.token]);

  useEffect(() => {
    if (loading === false && lastOrder === null) {
      setLOrder(order.pop());
    }
  }, [lastOrder, loading, order]);

  useEffect(() => {
    if (lastOrder !== null && loading === false) {
      cart.cartItems.map((items) => {
        dispatch(createDetailsOrder(items.id, items.qty, lastOrder.id, userInfo.token));
        return null
      })
    }
  });
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h2>Obrigado por comprar conosco!</h2>
          {
            setTimeout(function () {
              props.history.push('/orders');
            }, 8000)
          }
        </div>
      )}
    </div>
  )
}