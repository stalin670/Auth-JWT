import './App.css';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Navigate to='/Login' />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
