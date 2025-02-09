import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../utils/Context';

export default function Logout() {

  const navigate = useNavigate();
  const {setUser} = useContext(ContextApp);
  

  useEffect(() => {
    localStorage.removeItem("authToken"); // Store token in localStorage
    setUser({guest: true, name: "Guest"})
    navigate("/")
  }, [])

  return (
    <div>Logout....</div>
  )
}
