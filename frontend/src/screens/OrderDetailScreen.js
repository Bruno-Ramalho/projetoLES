import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderStatus, detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';


export default function OrderDetailScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  const token = userInfo.token
  const [status, setStatus] = useState('');
  const [pendente, setPendente] = useState(false);
  const [aprovado, setAprovado] = useState(false);
  const [entregue, setEntregue] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [devolver, setDevolver] = useState(false);

  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.detailsOrder);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();

  const changeStatusHandler = (e) => {
    e.preventDefault();
    dispatch(changeOrderStatus(orderId, token, status, order.totalPrice, userInfo.id));
    props.history.push('/adm/orders');
  }

  useEffect(() => {
    dispatch(detailsOrder(orderId, token));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (loading === false) {
      console.log(order)
    }
  }, [loading, order]);

  useEffect(() => {
    if (loading === false) {
      setStatus(order[1][0].status);
    }
  }, [loading, order])

  useEffect(() => {
    if (status === "PENDENTE") {
      setPendente(true)
    }
  }, [status]);

  useEffect(() => {
    if (status === "APROVADO") {
      setAprovado(true)
    }
  }, [status]);

  useEffect(() => {
    if (status === "ENTREGUE") {
      setEntregue(true)
    }
  }, [status]);

  useEffect(() => {
    if (status === "ENVIADO") {
      setEnviado(true)
    }
  }, [status]);

  useEffect(() => {
    if (status === "DEVOLUÇÃO_PENDENTE") {
      setDevolver(true)
    }
  }, [status]);

  return (
    <div>
      <h1>Pedido</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Endereço de Envio/Cobrança</h2>
                  <p>
                    <strong>Apelido:</strong> {order[1][0].endereco.apelido}<br />
                    <strong>Endereço:</strong>{order[1][0].endereco.address} - {order[1][0].endereco.numero}<br />
                    <strong>Código Postal:</strong>{order[1][0].endereco.postalCode}<br />
                    <strong>Bairro:</strong> {order[1][0].endereco.bairro}<br />
                    <strong>Cidade:</strong> {order[1][0].endereco.city}<br />
                    <strong>Estado:</strong> {order[1][0].endereco.state}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Pagamento</h2>
                  <p>
                    <strong>Nome do Titular: </strong> {order[1][0].cartao.cardHolderName}<br />
                    <strong>Data de Vencimento: </strong> {order[1][0].cartao.dueData}<br />
                    <strong>Bandeira: </strong> {order[1][0].cartao.bandeira}<br />
                    <strong>Número do cartão: </strong> {order[1][0].cartao.number}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Items do Pedido</h2>
                  <ul>
                    <div>
                      {order[0].map((prod) => (
                        <li>
                          <p>{prod.name}</p>
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="small">
                          </img>
                          <p>{prod.quantity}</p>
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Resumo do Pedido</h2>
                </li>
                <li>
                  <div className="row">
                    <p>Data do Pedido: {order[1][0].dataPedido}</p>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status Atual: {order[1][0].status}</div>
                    {
                      userInfo.admin && pendente ? (
                        <div>
                          <select
                            id="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value=" ">Selecione</option>
                            <option value="APROVADO">APROVADO</option>
                          </select>
                          <button onClick={changeStatusHandler}>Enviar</button>
                        </div>
                      ) : userInfo.admin && aprovado ? (
                        <div>
                          <select
                            id="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value=" ">Selecione</option>
                            <option value="ENVIADO">ENVIADO</option>
                          </select>
                          <button onClick={changeStatusHandler}>Enviar</button>
                        </div>
                      ) : userInfo.admin && enviado ? (
                        <div>
                          <select
                            id="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value=" ">Selecione</option>
                            <option value="ENTREGUE">ENTREGUE</option>
                          </select>
                          <button onClick={changeStatusHandler}>Enviar</button>
                        </div>
                      ) : userInfo.admin && devolver ? (
                        <div>
                          <select
                            id="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value=" ">Selecione</option>
                            <option value="DEVOLVIDO">DEVOLVIDO</option>
                          </select>
                          <button onClick={changeStatusHandler}>Enviar</button>
                        </div>
                      ) : !userInfo.admin && entregue ? (
                        <div>
                          <select
                            id="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value=" ">Selecione</option>
                            <option value="DEVOLUÇÃO_PENDENTE">Solicitar Devolução</option>
                          </select>
                          <button onClick={changeStatusHandler}>Enviar</button>
                        </div>
                      ) : <></>
                    }

                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Taxa de Envio</div>
                    <div>${order[1][0].taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong>Total do Pedido</strong>
                    </div>
                    <div>
                      <strong>${order[1][0].totalPrice}</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}