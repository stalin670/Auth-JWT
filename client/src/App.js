import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Register } from './Pages/Register';
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' exact element={<Navigate to='/Login' />} />
        <Route path='/Login' exact element={<Login />} />
        <Route path='/Register' exact element={<Register />} />
        <Route path='/Dashboard' exact element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
