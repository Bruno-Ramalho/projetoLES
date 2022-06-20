import React from 'react';
import { useHistory } from "react-router-dom";

export default function Address(props) {
  const { address } = props;
  let history = useHistory();

  const detailsAddressHandler = () => {
    history.push(`/address/set/${address.id}`);
  }

  return (
    <div key={address.id} className="card">
      <p className="medium"></p>
      <div className="card-body">
        <h2>{address.apelido}</h2>
        <div className="price">{address.postalCode}</div>
        <button onClick={detailsAddressHandler}>Acessar</button>
      </div>
    </div>
  );
}