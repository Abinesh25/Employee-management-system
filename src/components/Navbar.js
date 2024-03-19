import React from 'react'
import {  NavLink } from 'react-router-dom';
import { useAuth } from './Auth';
export const Navbar = () => {
  const auth=useAuth()
  return (
    <div>
        <nav className='navbar'>
        <div><h2>Employee Management System</h2></div> <br></br>  
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About us</NavLink>
        {auth.user==='admin'&&<NavLink to='/display'>Edit and Update</NavLink>}
        {!auth.user && <NavLink to='/login' id='login'>Login</NavLink>}
        {!auth.user && <NavLink to='/signup'>Signup</NavLink>}
        <div className="container-fluid">
                <span className="navbar-toggler-icon"></span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
                </div>
        </nav>
    </div>
  )
}