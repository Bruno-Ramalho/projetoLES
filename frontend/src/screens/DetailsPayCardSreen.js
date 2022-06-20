import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import { detailsPayCard } from '../actions/payCardAction';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';

export default function DetailsPayCardScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token

  const payCardId = props.match.params.id;
  const payCardDetails = useSelector((state) => state.payCardDetails);
  const { payCard, loading, error } = payCardDetails;
  const dispatch = useDispatch();

  const selectPayCard = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payCard));
    props.history.push('/placeorder');
  }

  useEffect(() => {
    dispatch(detailsPayCard(payCardId, token));
  }, [dispatch, payCardId, token]);

  return (
    <div>
      <h1>Endereço </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/savedCards">Retornar</Link>
          <div className="card card-body">
            <h2>Cartão para pagamento</h2>
            <p>
              <strong>Nome do Titular: </strong>{payCard.cardHolderName}.<br />
              <strong>Número do Cartão: </strong>{payCard.number}<br />
              <strong>Bandeira: </strong>{payCard.bandeira}<br />
              <strong>Data de Vencimento: </strong>{payCard.dueData}
            </p>
            <button onClick={selectPayCard}>Escolher</button>
          </div>
        </>
      )}
    </div>
  );
}