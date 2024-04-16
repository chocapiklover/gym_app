import { useState } from 'react'
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/signup';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() 
{

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <SignUp /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
