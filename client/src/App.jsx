import React, { useContext } from 'react'
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Care from './pages/Care'
import { AppContext } from './context/AppContext'
import Login from './components/Login'
import Reward from './pages/Reward'
import History from './pages/History'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const {showLogin} = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-white'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/care' element={<Care/>}/>
        <Route path='/reward' element={<Reward/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
