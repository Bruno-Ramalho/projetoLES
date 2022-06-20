import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { graphOrder } from '../actions/orderActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';


export default function AdminChartScreen(props) {

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;

  const data = [['Year', 'Sales', 'Expenses'], ['2004', 1000, 400], ['2005', 1170, 460], ['2006', 660, 1120], ['2007', 1030, 540]];
  const orderGraph = useSelector((state) => state.orderGraph);
  const { order, loading, error } = orderGraph;

  const info = [];

  const [dtSt, setDtSt] = useState('');
  const [dtEn, setDtEn] = useState('');
  const [show, setShow] = useState(true);

  const submitHandler = () => {
    console.log(order)
    for (var i = 0; i < order.length; i++) {
      info[0] = order[i].produto.category;
      info[1] = order[i].pedido.dataPedido;
      info[2] = order[i].quantity;
      data.push(info);
    };
  };


  const options = {
    title: "Graph",
  };

  useEffect(() => {
    dispatch(graphOrder(userInfo.admin, token))
  }, [dispatch, userInfo.admin, token])


  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <label>Data:</label>
          <input
            type="date"
            id="dtSt"
            required
            onChange={(e) => setDtSt(e.target.value)}
          ></input>
          <label>Data:</label>
          <input
            type="date"
            id="dtEn"
            required
            onChange={(e) => setDtEn(e.target.value)}
          ></input>
          <button className="primary" onClick={submitHandler} type="submit">
            Cadastrar
          </button>
          {
            show ? (
              <Chart
                chartType="LineChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            ) : (
              <></>
            )
          }
        </div>
      )}
    </div>
  )
}