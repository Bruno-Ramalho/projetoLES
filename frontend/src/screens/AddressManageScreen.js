import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateAddress } from '../actions/enderecoActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';


export default function AddressManageScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token

  const endDetails = useSelector((state) => state.endDetails);
  const { userAddress, loading, error } = endDetails;
  const dispatch = useDispatch();
  console.log(userAddress)

  const [apelido, setApelido] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');

  const updateAddressHandler = (e) => {
    e.preventDefault();
    dispatch(updateAddress(apelido, userAddress.id, address, city, postalCode, state, numero, bairro, token));
  }

  useEffect(() => {
    if (loading === false) {
      setApelido(userAddress.apelido)
      setAddress(userAddress.address)
      setCity(userAddress.city)
      setBairro(userAddress.bairro)
      setNumero(userAddress.numero)
      setPostalCode(userAddress.postalCode)
      setState(userAddress.state)
    }
  }, [loading])


  return (
    <div>
      <Link to="/usuarios">Retornar</Link>
      <h1>Endereço </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form className="form" onSubmit={updateAddressHandler}>
          <div>
            <h1>Editar Endereço</h1>
          </div>
          <div>
            <label htmlFor="apelido">Maneira de identificar o endereço</label>
            <input
              type="text"
              id="apelido"
              placeholder="Ex: Minha casa, Casa da minha mãe, Casa da sogra, etc..."
              value={apelido}
              onChange={(e) => setApelido(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="postalCode">CEP</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Entre com o CEP"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="address">Logradouro</label>
            <input
              type="text"
              id="address"
              placeholder="Entre com o seu endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              id="numero"
              placeholder="Entre com o número da residência"
              value={numero}
              onChange={(e) => setNumero(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              placeholder="Entre com o bairro da residência"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              placeholder="Entre com a cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="state">Estado (UF)</label>
            <input
              type="text"
              id="state"
              placeholder="Entre com o estado onde mora"
              value={state}
              onChange={(e) => setState(e.target.value)} required
            />
          </div>
          <div>
            <label />
            <button className="primary" type="submit">Continuar</button>
          </div>
        </form>
      )}
    </div>
  );
}