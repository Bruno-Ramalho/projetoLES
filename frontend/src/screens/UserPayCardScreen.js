import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import { listPayCardsUsuario } from "../actions/payCardAction"
import PayCardUser from "../components/payCard/PayCardUser";
import { Link } from "react-router-dom";


export default function UserPayCardScreen(props) {
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
      <Link to="/usuarios">Retornar</Link>
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
                <PayCardUser key={payCard.id} payCard={payCard} token={token}></PayCardUser>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}