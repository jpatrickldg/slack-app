import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {
  const [activeUser, setActiveUser] = useState<object>({})

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login activeUser={activeUser} setActiveUser={setActiveUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard activeUser={activeUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
