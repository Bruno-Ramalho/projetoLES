import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction } from "../actions/userActions";



export default function UserManagerScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;

  const dispatch = useDispatch();

  const userPasswordHandler = (e) => {
    e.preventDefault();
    props.history.push('/user/password');
  }

  const userDetailsHandler = (e) => {
    e.preventDefault();
    props.history.push('/user/details');
  }

  const orderListHandler = (e) => {
    e.preventDefault();
    props.history.push('/orders');
  }

  const addressListHandler = (e) => {
    e.preventDefault();
    props.history.push('/user/address');
  }

  const payCardListHandler = (e) => {
    e.preventDefault();
    props.history.push('/user/paycard');
  }

  const cupomListHandler = (e) => {
    e.preventDefault();
    props.history.push('/user/cupom');
  }

  useEffect(() => {
    dispatch(userDetailsAction(userInfo.id, token))
  }, [dispatch, userInfo.id, token])


  return (
    <div>
      <h1>Gerenciamento da Conta</h1>
      <div>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Dados Pessoais</h2>
                  <p>
                    <strong>Nome: </strong>
                    {userInfo.name}
                  </p>
                  <p>
                    <strong> E-mail: </strong>
                    {userInfo.email}
                  </p>
                  <button onClick={userDetailsHandler}>Editar Perfil</button>
                  <button onClick={userPasswordHandler}>Alterar Senha</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Cartões Cadastrados</h2>
                  <div>
                    <button onClick={payCardListHandler}>Visualizar Cartões Cadastrados</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Endereços Cadastrados</h2>
                  <div>
                    <button onClick={addressListHandler}>Visualizar Endereços Cadastrados</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Pedidos</h2>
                  <div>
                    <button onClick={orderListHandler}>Visualizar Pedidos Realizados</button>
                  </div>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Cupons</h2>
                  <div>
                    <button onClick={cupomListHandler}>Visualizar Cupons de Troca</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}