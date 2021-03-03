import React, {useState, useEffect} from 'react'
import Routers from "./Routers/Routers"
import './App.css';
import Header from '../src/components/Header'
import LoginNav from '../src/pages/userauth/LoginNav'
import {UserProvider} from './contexts/userContext'
import {GroupProvider} from './contexts/groupContext'
import {ActivityProvider} from './contexts/activityContext'

function App() {
  // const logged = localStorage.getItem('authUser');
  // const user = logged ? <LoginNav /> : <Header />;
  // useEffect(()=>{}, [user])
  
  return (
    <>
    <ActivityProvider>
      <GroupProvider>
        <UserProvider>
          <Header />
          <Routers />
        </UserProvider>
      </GroupProvider>
    </ActivityProvider>
    </>
  )
}

export default App
