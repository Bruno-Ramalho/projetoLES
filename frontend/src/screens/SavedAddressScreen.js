import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { enderecosUsuario } from '../actions/enderecoActions'
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import Address from "../components/address/Address";

export default function SavedAddressScreen(props) {
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
      <CheckoutSteps step1 step2></CheckoutSteps>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="card card-body">
          <h1>Endereços Cadastrados</h1>
          <div className="row center">
            {address.map((address) => (
              <Address key={address.id} address={address}></Address>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}