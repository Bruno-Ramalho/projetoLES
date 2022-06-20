import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { removePayCard } from '../../actions/payCardAction';

export default function PayCardUser(props) {
  const { payCard, token } = props;
  let history = useHistory();
  console.log(payCard.id)

  const dispatch = useDispatch();

  const removePayCardHandler = (e) => {
    e.preventDefault();
    dispatch(removePayCard(payCard.id, token))
  }

  return (
    <div key={payCard.id} className="card">
      <p className="medium"></p>
      <div className="card-body">
        <h2>{payCard.number}</h2>
        <div className="price">{payCard.cardHolderName}</div>
        <button onClick={removePayCardHandler}>Remover</button>
      </div>
    </div>
  );
}