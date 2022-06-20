import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { detailsAddress, removeAddress } from '../../actions/enderecoActions';

export default function AddressUser(props) {
  const { address, token } = props;
  let history = useHistory();

  const dispatch = useDispatch();


  const detailsAddressHandler = () => {
    dispatch(detailsAddress(address.id, token));
    history.push(`/user/change/address/${address.id}`);
  }

  const deleteAddressHandler = () => {
    dispatch(removeAddress(address.id, token));
  }

  return (
    <div key={address.id} className="card">
      <p className="medium"></p>
      <div className="card-body">
        <h2>{address.apelido}</h2>
        <div className="price">{address.postalCode}</div>
        <button onClick={detailsAddressHandler}>Acessar</button>
        <button onClick={deleteAddressHandler}>Excluir</button>
      </div>
    </div>
  );
}