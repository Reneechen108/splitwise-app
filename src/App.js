import React, {useState, useEffect} from 'react'
import Routers from "./Routers/Routers"
import './App.css';
import Header from '../src/components/Header'
import LoginNav from '../src/pages/userauth/LoginNav'

function App() {
  const logged = localStorage.getItem('authUser');
  const user = logged ? <LoginNav /> : <Header />;
  useEffect(()=>{}, user)
  
  return (
    <>
    {user}
    <Routers />
    </>
  )
}

export default App
