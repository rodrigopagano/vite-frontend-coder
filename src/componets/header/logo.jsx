import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Logo =()=>{ 
  return (
    <Link to='/'>
    <img src={logo} className="logo img-fluid" width="150" height="48" alt="logo tecnologia"/>
    </Link>
)} 

export default Logo;