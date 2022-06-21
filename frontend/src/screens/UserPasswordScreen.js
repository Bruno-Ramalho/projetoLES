import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userPasswordUpdate } from "../actions/userActions";


export default function UserPasswordScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const token = userInfo.token;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('A senha e a confirmação da senha estão diferentes');
    } else {
      dispatch(userPasswordUpdate(userInfo.id, password, token));
      props.history.push('/');
    }
  };

  return (
    <div>
      <Link to="/usuarios">Retornar</Link>
      <h1>Alteração de dados da Conta</h1>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Alterar dados da Conta</h1>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Entre com sua senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme a senha"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Alterar
          </button>
        </div>
      </form>
    </div>
  )
}