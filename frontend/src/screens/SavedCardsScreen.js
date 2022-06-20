import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { listPayCardsUsuario } from "../actions/payCardAction"
import PayCard from "../components/payCard/PayCard";


export default function SavedCardsScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token
  const dispatch = useDispatch();

  const payCardList = useSelector((state) => state.payCardList)
  const { loading, error, payCards } = payCardList

  useEffect(() => {
    dispatch(listPayCardsUsuario(userInfo.id, token))
  }, [dispatch, userInfo.id, token])

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="card card-body">
          <h2>Cartões Cadastrados</h2>
          <div>
            <div className="row center">
              {payCards.map((payCard) => (
                <PayCard key={payCard.id} payCard={payCard}></PayCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}