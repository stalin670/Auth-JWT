import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Register } from './Pages/Register';
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Navigate to='/Login' />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
