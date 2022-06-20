import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userUpdate } from "../actions/userActions";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";


export default function UserDetailsScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { details, loading, error } = userDetails
  const token = userInfo.token;

  const [name, setName] = useState(details.data.name);
  const [dtNasc, setDtNasc] = useState(details.data.dtNasc);
  const [genero, setGenero] = useState(details.data.genero);
  const [cpf, setCpf] = useState(details.data.cpf);
  const [tel, setTel] = useState(details.data.tel);
  const [tipoTel, setTipoTel] = useState(details.data.tipoTel);
  const [email, setEmail] = useState(details.data.email);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdate(userInfo.id, name, dtNasc, genero, cpf, tipoTel, tel, email, token));
  };

  return (
    <div>
      <Link to="/usuarios">Retornar</Link>
      <h1>Alteração de dados da Conta</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Alterar dados da Conta</h1>
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Entre com seu nome"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="dtNasc">Data de nascimento</label>
            <input
              type="text"
              id="dtNasc"
              value={dtNasc}
              required
              onChange={(e) => setDtNasc(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="genero">Gênero</label>
            <select
              id="genero"
              required
              value={genero}
              onChange={(e) => setGenero(e.target.value)}>
              <option value=" ">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="Entre com seu cpf"
              value={cpf}
              required
              onChange={(e) => setCpf(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="tipoTel">Tipo de telefone</label>
            <select
              id="tipoTel"
              value={tipoTel}
              required
              onChange={(e) => setTipoTel(e.target.value)}>
              <option value=" ">Selecione</option>
              <option value="Celular">Celular</option>
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>
          <div>
            <label htmlFor="tel">Telefone</label>
            <input
              type="text"
              id="tel"
              placeholder="Entre com seu telefone"
              value={tel}
              required
              onChange={(e) => setTel(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entre com seu endereço de email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Alterar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}