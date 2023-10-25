import React from 'react'
import Login from '../Components/Login/Login'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[])

  return (
    <Login />
  )
}

export default LoginPage