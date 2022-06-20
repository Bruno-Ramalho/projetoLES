import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { enderecosUsuario } from '../actions/enderecoActions'
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import AddressUser from "../components/address/AddressUser";
import { Link } from "react-router-dom";

export default function UserAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;
  const endList = useSelector((state) => state.endList);
  const { loading, error, address } = endList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enderecosUsuario(userInfo.id, token))
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
            <h1>Endereços Cadastrados</h1>
            <div className="row center">
              {address.map((address) => (
                <AddressUser key={address.id} address={address} token={token}></AddressUser>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}