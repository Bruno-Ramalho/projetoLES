import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/boxes/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log(id)
    dispatch(removeFromCart(id));
  }
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping')
  }

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Carrinho</h1>
        {cartItems.length === 0 ?
          <MessageBox>
            Carrinho está Vazio. <Link to="/">Loja</Link>
          </MessageBox>
          :
          (
            <ul>
              {
                cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="row">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small">
                        </img>
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.id, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )
                          )}
                        </select>
                      </div>
                      <div>
                        ${item.price}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.id)}
                        >Remover</button>
                      </div>
                    </div>
                  </li>
                ))
              }
              <MessageBox>
                Continue suas compras. <Link to="/">Loja</Link>
              </MessageBox>
            </ul>
          )
        }
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >Continuar para Checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}