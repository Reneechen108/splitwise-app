import React, {useState, useEffect} from 'react'
import Routers from "./Routers/Routers"
import './App.css';
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import {UserProvider} from './contexts/userContext'
import {GroupProvider} from './contexts/groupContext'
import {ActivityProvider} from './contexts/activityContext'

// import Home from '../pages/Home'
// import SignupPage from '../pages/userauth/SignupPage'
// import LoginPage from '../pages/userauth/LoginPage'
// import Profile from '../pages/userauth/Profile'
// import Dashboard from '../pages/Dashboard'
// import Create from '../pages/Create'
// import Expenses from '../pages/Expenses'
// import Activity from '../pages/Activity'

// const examples = {
//     Home: <Home/>,
//     SignupPage: <SignupPage/>,
//     LoginPage: <LoginPage/>,
//     Profile: <Profile/>,
//     Dashboard: <Dashboard name={"React"}/>,
//     Create: <Create/>,
//     Expenses: <Expenses/>,
//     Activity: <Activity/>
// }

function App() {
  return (
    <>
    <ActivityProvider>
      <GroupProvider>
        <UserProvider>
          <Header />
          <Routers/>
        </UserProvider>
      </GroupProvider>
    </ActivityProvider>
    </>
  )
}

export default App
