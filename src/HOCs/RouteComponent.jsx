import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteComponent = ({isAuth, isLogin, Component, redirectPath}) => {
    const {user}=useSelector(state=>state.auth);
    if(isLogin){
        return user?<Component></Component> : <Navigate to={redirectPath}></Navigate>
      }
      //chỉ được vào khi chưa đăng nhập
      if(isAuth){
          return !user ? <Component></Component> : <Navigate to={redirectPath}></Navigate>
      }
  return (
    <Component></Component>
  )
}

export default RouteComponent