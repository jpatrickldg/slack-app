import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {
  const [activeUser, setActiveUser] = useState<object>(() => {
    const savedUser = localStorage.getItem('activeUser')
    if (savedUser) {
      const initialValue = JSON.parse(savedUser)
      return initialValue
    } else return {}

  })

  useEffect(() => {
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
  }, [activeUser])

  return (
    <Router>
      {Object.keys(activeUser).length !== 0 ?
        <Routes>
          <Route path='/dashboard' element={<Dashboard activeUser={activeUser} setActiveUser={setActiveUser} />} />
          <Route path='*' element={<Navigate replace to='/dashboard' />} />
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Login activeUser={activeUser} setActiveUser={setActiveUser} />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
