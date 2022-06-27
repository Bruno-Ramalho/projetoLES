import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";

export default function PlaceOrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const detailCupom = useSelector((state) => state.detailCupom)
  const { loading, error, cupom } = detailCupom;
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = toPrice(0.10 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;

  console.log(typeof (cart.cartItems[0].qty))
  console.log(cupom);
  const dispatch = useDispatch();


  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (cupom.id) {
      dispatch(createOrder(cart.shippingAddress.id, cart.paymentMethod.id, cart.cartItems, userInfo.id, (cart.totalPrice - cupom.valorCupom), cart.taxPrice, userInfo.token, cupom.id));
      setTimeout(function () {
        props.history.push('/thanks');
      }, 4000)
    } else {
      dispatch(createOrder(cart.shippingAddress.id, cart.paymentMethod.id, cart.cartItems, userInfo.id, cart.totalPrice, cart.taxPrice, userInfo.token));
      setTimeout(function () {
        props.history.push('/thanks');
      }, 4000)
    }

  };

  const cupomHandler = (e) => {
    e.preventDefault();
    props.history.push('/savedCupoms');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Envio</h2>
                    <p>
                      <strong>Nome: </strong>
                      {cart.shippingAddress.fullName} <br />
                      <strong>Apelido: </strong>
                      {cart.shippingAddress.apelido}
                      <strong> Endereço: </strong>
                      {cart.shippingAddress.address},{cart.shippingAddress.numero},{cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode},{cart.shippingAddress.state}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Pagamento</h2>
                    <p>
                      <strong>Noma do Titular: </strong>
                      {cart.paymentMethod.cardHolderName} <br />
                    </p>
                    <p>
                      <strong>Número do Cartão: </strong>
                      {cart.paymentMethod.number} <br />
                    </p>
                  </div>
                </li>
                <li>
                  <div className="col-2">
                    <div className="card card-body">
                      <h2>Resumo do Pedido</h2>
                      <ul>
                        {cart.cartItems.map((item) => (
                          <li key={item.id}>
                            <div className="row">
                              <div>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="small"
                                ></img>
                              </div>
                              <div className="min-30">
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>
                              <div>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Resumo da compra</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Valor da compra</div>
                    <div>${cart.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                {
                  cupom.id ? (
                    <li>
                      <div className="row">
                        <div>Valor do cupom</div>
                        <div>$-{cupom.valorCupom}</div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )
                }
                <li>
                  <div className="row">
                    <div>Taxa de envio</div>
                    <div>${cart.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                {
                  cupom.id ? (
                    <li>
                      <div className="row">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <div>
                          <strong>${(cart.totalPrice - cupom.valorCupom).toFixed(2)}</strong>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <div className="row">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <div>
                          <strong>${cart.totalPrice.toFixed(2)}</strong>
                        </div>
                      </div>
                    </li>
                  )
                }

                <li>
                  <div className="row">
                    <button onClick={cupomHandler}>Adicionar Cupom</button>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="primary block"
                    disabled={cart.cartItems.length === 0}
                  >
                    Fechar Pedido
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
