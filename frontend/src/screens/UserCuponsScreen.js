import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import { Link } from "react-router-dom";
import { userListCupom } from "../actions/cupomActions";
import Cupom from "../components/cupom/Cupom";

export default function UserCuponsScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;
  const cupomList = useSelector((state) => state.cupomList);
  const { loading, error, cupom } = cupomList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userListCupom(userInfo.id, token))
  }, [dispatch, userInfo.id, token])

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/usuarios">Retornar</Link>
          <div className="card card-body">
            <h1>Cupons Ativos</h1>
            <div className="row center">
              {cupom.map((cupom) => (
                <Cupom key={cupom.id} cupom={cupom} ativo={cupom.ativo}></Cupom>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}