import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsCupom } from '../../actions/cupomActions';

export default function CupomUser(props) {
  const { cupom, token, ativo } = props;

  let history = useHistory();

  const dispatch = useDispatch();

  const useCupomHandler = (e) => {
    e.preventDefault();
    dispatch(detailsCupom(cupom.id, token));
    history.push("/placeorder");
  }

  return (
    <div>
      {
        ativo ? (
          <div key={cupom.id} className="card">
            <p className="medium"></p>
            <div className="card-body">
              <h2>Cupom</h2>
              <div className="price">R${cupom.valorCupom}</div>
              <button onClick={useCupomHandler}>Utilizar</button>
            </div>
          </div>
        ) : (
          <></>
        )
      }

    </div>

  );
}