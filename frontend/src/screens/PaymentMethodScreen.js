import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { registerPayCard } from "../actions/payCardAction";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";

export default function PaymentMethodScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const idUsuario = userInfo.id;
  const token = userInfo.token;


  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  if (!shippingAddress.address) {
    props.history.push('shipping');
  }
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod({ idUsuario, bandeira, number, cardHolderName, cvc, dueData }));
    dispatch(registerPayCard(idUsuario, bandeira, number, cardHolderName, cvc, dueData, token));
    props.history.push('/placeorder');
  };

  const [number, setNumber] = useState(paymentMethod.number);
  const [cardHolderName, setCardHolderName] = useState(paymentMethod.cardHolderName);
  const [cvc, setCvc] = useState(paymentMethod.cvc);
  const [dueData, setDueDate] = useState(paymentMethod.dueData);
  const [bandeira, setBandeira] = useState(paymentMethod.bandeira);

  const handleRedirectCards = (e) => {
    e.preventDefault();
    props.history.push('/savedCards');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <button onClick={handleRedirectCards}>Utilizar cartão cadastrado</button>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Pagamento com Cartão</h1>
        </div>
        <div>
          <label htmlFor="number">Número do Cartão</label>
          <input
            type="number"
            id="number"
            placeholder="Entre o número do Cartão"
            value={number}
            onChange={(e) => setNumber(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="cardHolderName">Nome do Titular do Cartão</label>
          <input
            type="text"
            id="cardHolderName"
            placeholder="Entre o nome do Titular do Cartão"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="bandeira">Bandeira do Cartão</label>
          <select
            id="bandeira"
            required
            onChange={(e) => setBandeira(e.target.value)}>
            <option value=" ">Selecione</option>
            <option value="Visa">Visa</option>
            <option value="Master Card">Master Card</option>
            <option value="American Express">American Express</option>
            <option value="Elo">Elo</option>
            <option value="Hipercard">Hipercard</option>
          </select>
        </div>
        <div>
          <label htmlFor="cvc">CVC do Cartão</label>
          <input
            type="number"
            id="cvc"
            placeholder="Entre com o CVC do Cartão"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Data de Vencimento do Cartão</label>
          <input
            type="text"
            id="dueData"
            placeholder="Entre com a data de vencimento do Cartão"
            value={dueData}
            onChange={(e) => setDueDate(e.target.value)} required
          />
        </div>
        <div>
          <button className="primary" type="submit">Continuar</button>
        </div>
      </form>
    </div>
  );
}
