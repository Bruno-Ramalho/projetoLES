import React from 'react';
import { useHistory } from "react-router-dom";

export default function PayCard(props) {
  const { payCard } = props;
  let history = useHistory();

  const detailsPayCardHandler = () => {
    history.push(`/payCard/set/${payCard.id}`);
  }

  return (
    <div key={payCard.id} className="card">
      <p className="medium"></p>
      <div className="card-body">
        <h2>{payCard.number}</h2>
        <div className="price">{payCard.cardHolderName}</div>
        <button onClick={detailsPayCardHandler}>Acessar</button>
      </div>
    </div>
  );
}