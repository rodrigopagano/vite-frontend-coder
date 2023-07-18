import React, { useState } from 'react';
import '../style/header.css';
import Logo from './logo';
import Login from '../users/login';
import Register from '../users/register';
import Carrito from './CardWidget';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

const Navbar =()=> {
  const Navigate = useNavigate()
  const [show , setShow] = useState(false);
  const [showr , setShowr] = useState(false);
  const handleClose = () =>setShow(false);
  const handleCloser = () =>setShowr(false);
  const handleShow = ()=> setShow(true)
  const handleShowr = ()=>setShowr(true)
  const handlelogout =async()=>{

    const res = await axios({
      url:"http://localhost:8080/api/session/logout",
      method: 'GET',
        }) 
    
    const data = res.data
    Swal.fire({
      title: `${data.message}`,
      icon: `${data.status}`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        handleClose()
        Navigate('/')
      }  
    });
} 


  return(
      <>
      <header className="container-fluid">
      <div className="row p-3 d-flex justify-content-center">
          <div className="col-6">
            <Logo /> 
          </div>
          <div className="col-6 d-flex justify-content-end">
           <Carrito /> 
          </div>
          <nav className="row navbar navbar-expand-md  p-0">
          <div className="col d-flex justify-content-center">
          <button className="navbar-toggler m-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="material-icons"><i className="bi bi-list"></i></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div className="">
             <button className="btn btn-outline-success m-3" type="submit" onClick={handleShow}>
                 Iniciar Sesión
             </button>
             <button className="btn btn-outline-success" type="submit" onClick={handleShowr}>
                 Iniciar register
             </button>         
              <button className="btn btn-outline-success m-3" type="submit" onClick={handlelogout} >
                 Cerrar Sesión
              </button>
            </div>  
         </div>
          </div> 
          {show && <Login show={show} handleClose={handleClose}/>}
          {showr &&  <Register show={showr} handleClose={handleCloser} />}
        </nav>
     </div>
   </header>
 </>
    )
}   
export default Navbar;
