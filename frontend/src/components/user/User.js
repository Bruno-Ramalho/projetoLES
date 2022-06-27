import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userActiveAction, userInactiveAction } from '../../actions/userActions';

export default function User(props) {
  const { user, admin, token } = props;

  let history = useHistory();

  const dispatch = useDispatch();

  const inactiveUserHandler = () => {
    dispatch(userInactiveAction(admin, user.id, token));
    history.push("/admin");
  }

  const activeUserHandler = () => {
    dispatch(userActiveAction(admin, user.id, token));
    history.push("/admin");
  }

  return (
    <div key={user.id} className="card">
      <p className="medium"></p>
      <div className="card-body">
        <h2>{user.name}</h2>
        <div className="price">{user.email}</div>
        {
          user.ativo ? (
            <div className="price">Status: Ativo</div>
          ) : (
            <div className="price">Status: Inativo</div>
          )
        }
        <button onClick={activeUserHandler}>Ativar</button>
        <button onClick={inactiveUserHandler}>Inativar</button>

      </div>
    </div>
  );
}