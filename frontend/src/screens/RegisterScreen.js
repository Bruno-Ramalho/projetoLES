import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [dtNasc, setDtNasc] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [tel, setTel] = useState('');
  const [tipoTel, setTipoTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('A senha e a confirmação da senha estão diferentes');
    } else {
      dispatch(register(name, dtNasc, genero, cpf, tipoTel, tel, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Criar uma Conta</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Entre com seu nome"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="dtNasc">Data de nascimento</label>
          <input
            type="date"
            id="dtNasc"
            required
            onChange={(e) => setDtNasc(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="genero">Gênero</label>
            <select
            id="genero"
            required
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
            required
            onChange={(e) => setCpf(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="tipoTel">Tipo de telefone</label>
          <select
            id="tipoTel"  
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
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
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
            Cadastrar
          </button>
        </div>
        <div>
          <label />
          <div>
            Já tem conta?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Faça o Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}