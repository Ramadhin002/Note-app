import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token')||'');
  const nav = useNavigate();
  function logout(){ localStorage.removeItem('token'); setToken(''); nav('/'); }
  return (<div style={{maxWidth:800, margin:'0 auto', padding:16}}>
    <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <nav style={{display:'flex', gap:12}}><Link to="/">Home</Link><Link to="/dashboard">Dashboard</Link></nav>
      <div>{!token ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}</div>
    </header>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login onLogin={(t)=>{ localStorage.setItem('token', t); setToken(t); }} />}/>
      <Route path="/dashboard" element={<Dashboard token={token}/>} />
    </Routes>
  </div>);
}
