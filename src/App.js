import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useAuth } from './Context/auth';
import Profile from './Pages/Profile';
import Announcement from './Pages/Announcement';
import Sports from './Pages/Sports';

function App() {
  const [auth, setAuth] = useAuth()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {auth && //Private routes
        <>
          <Route path='/profile' element={<Profile />} />
          <Route path='/announcement' element={<Announcement />} />
          <Route path='/sports' element={<Sports />} />
        </>
      }
    </Routes>
  );
}

export default App;
