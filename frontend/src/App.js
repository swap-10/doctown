import React, { useContext } from 'react';
import {Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navigation/Navbar';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Home from './components/Home';

function App() {
  const userAuth = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {userAuth.user ? (
        <>
          <button onClick={userAuth.logout}>Logout</button>
        </>
      ) : (
        <>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />        
      </Routes>
    </>
  );
}

export default App;