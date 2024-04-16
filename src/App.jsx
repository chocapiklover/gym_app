import { useState } from 'react'
import MainPage from './pages/MainPage';
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
        </Routes>
      </Router>
    </>
  )
}

export default App
