import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { graphOrder } from "../actions/orderActions";
import { userDetailsAction } from "../actions/userActions";

export default function AdminManagerScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;

  const dispatch = useDispatch();


  const orderListHandler = (e) => {
    e.preventDefault();
    props.history.push('/adm/orders');
  }

  const userListHandler = (e) => {
    e.preventDefault();
    props.history.push('/manage/users');
  }

  const orderGraphHandler = (e) => {
    e.preventDefault();
    props.history.push('/Adminchart');
  }

  useEffect(() => {
    dispatch(userDetailsAction(userInfo.id, token))
  }, [dispatch, userInfo.id, token])


  return (
    <div>
      <h1>Gerenciamento da Conta</h1>
      <div>
        <div className="row top">
        </div>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Gerenciar Usuários</h2>
                  <div>
                    <button onClick={userListHandler}>Visualizar Usuários Cadastrados</button>
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
                  <h2>Gráficos de Pedidos</h2>
                  <div>
                    <button onClick={orderGraphHandler}>Visualizar Gráfico de Pedidos</button>
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
                  <h2>Gerenciar Pedidos</h2>
                  <div>
                    <button onClick={orderListHandler}>Gerenciar Pedidos Realizados</button>
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