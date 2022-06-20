import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userListAction } from '../actions/userActions';
import LoadingBox from '../components/boxes/LoadingBox';
import MessageBox from '../components/boxes/MessageBox';
import User from '../components/user/User';

export default function AdminManageUserScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const token = userInfo.token;

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userListAction(userInfo.admin, token))
  }, [dispatch, userInfo.admin, token])

  return (
    <div>
      <Link to="/admin">Retornar</Link>
      <h1>Usuários</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {(users.data).map((user) => (
            <User key={user.id} user={user} admin={userInfo.admin} token={token}></User>
          ))}
        </div>
      )}
    </div>
  )
}