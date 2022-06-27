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

  const orderGraph = useSelector((state) => state.orderGraph);
  const { order, loading, error } = orderGraph;

  const [data, setData] = useState('')
  const [dtSt, setDtSt] = useState('');
  const [dtEn, setDtEn] = useState('');
  const [show, setShow] = useState(true);

  const submitHandler = () => {
    console.log(order)
  };

  const options = {
    title: "Graph",
  };

  useEffect(() => {
    dispatch(graphOrder(userInfo.admin, token));
  }, [dispatch, userInfo.admin, token])

  useEffect(() => {
    if (loading === false) {
      setData(order[0]);
      console.log(data)
    }
  }, [order, loading, data])
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