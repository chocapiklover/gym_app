
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/signup';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() 
{

  return (
    <>
      <Router>
      <Navbar /> 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <SignUp /> } />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
