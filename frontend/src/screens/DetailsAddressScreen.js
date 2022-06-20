import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import { detailsAddress } from '../actions/enderecoActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';


export default function DetailsAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token

  const addressId = props.match.params.id;
  const endDetails = useSelector((state) => state.endDetails);
  const { userAddress, loading, error } = endDetails;
  const dispatch = useDispatch();

  const selectAddress = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(userAddress));
    props.history.push('/payment');
  }

  useEffect(() => {
    dispatch(detailsAddress(addressId, token));
  }, [dispatch, addressId, token]);


  return (
    <div>
      <h1>Endereço </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/savedAddress">Retornar</Link>
          <div className="card card-body">
            <h2>Endereço de Envio/Cobrança</h2>
            <p>
              <strong>Apelido:</strong> {userAddress.apelido}<br />
              <strong>Endereço:</strong>{userAddress.address} - {userAddress.numero}<br />
              <strong>Código Postal:</strong>{userAddress.postalCode}<br />
              <strong>Bairro:</strong> {userAddress.bairro}<br />
              <strong>Cidade:</strong> {userAddress.city}<br />
              <strong>Estado:</strong> {userAddress.state}
            </p>
            <button onClick={selectAddress}>Escolher</button>
          </div>
        </>
      )}
    </div>
  );
}