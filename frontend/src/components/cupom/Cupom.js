import React from 'react';

export default function Cupom(props) {
  const { cupom, ativo } = props;

  return (
    <div>
      {
        ativo ? (
          <div key={cupom.id} className="card">
            <p className="medium"></p>
            <div className="card-body">
              <h2>Cupom</h2>
              <div className="price">R${cupom.valorCupom}</div>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </div>

  );
}