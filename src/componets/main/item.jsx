import React, { useEffect, useState } from 'react';
import '../style/card.css';
import '../style/boton.css';
import axios from 'axios';
import Swal from 'sweetalert2';



export const Items =({info})=>{
  const {_id ,price, thumbnail, title} = info
  const [userLogin, setUserLogin]= useState(false)
 
  
   useEffect(()=>{
     const user = localStorage.getItem('user')
        if (!user){
        setUserLogin(false)
     }else{
        setUserLogin(true)
        
     }
    
  },[])
  
 
 
 
   const addProduct = (async(id)=>{
      if (!userLogin){
        Swal.fire({
           icon: 'error',
           title: 'Para Agregar Producto',
           text: 'Iniciar Sesión',
          })
        } else{
         const user = localStorage.getItem('user')
          const {cart} = JSON.parse(user)
          const res = await axios({
             url:`http://localhost:8080/api/carts/${cart}/product/${id}`,
             method: 'POST',
             withCredentials: true,
             })         
             const data = res.data
            }
       })
    
    return(
        <div className="col-md-4  d-flex justify-content-center m-2">
             <img src={thumbnail} className="img-fluid img-card" width="200" alt={title}/>
            <div className="col-md-4 titulo">
             <div className="card-body text-center">
              <h5 className="card-title card-titulo ">{title}</h5>
              <p className="card-text precio ">$ {price}</p>
               <button onClick={()=> addProduct(_id)}>Agregar</button>
             </div>
          </div>
        </div>
         
    )
}
export default Items;