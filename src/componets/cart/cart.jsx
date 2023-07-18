import React,{useEffect, useState } from "react";
import '../style/ItemCart.css';
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Cart =()=> {
  const  infouser = JSON.parse(localStorage.getItem('user'))
  let cid = infouser.cart
  const [dataCart, setDataCart] = useState([])
   const [priceTotal, setPriceTotal] = useState("")
   const navigate = useNavigate()
     
    const RemoveItem =async(pid) =>{
                            
          const res = await axios({
             url:`http://localhost:8080/api/carts/${cid}/product/${pid}`,
             method: 'DELETE',
             withCredentials: true,
             })         
             const data = res.data
            if (data.status == "success") {
              Swal.fire({
                title: `${data.message}`,
                icon: `${data.status}`,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed){
                setDataCart(data.payload.products)
                setPriceTotal(data.payload.priceTotal)
                 navigate('/cart')}
              });
            }
        }
    
    

    const ClearCart =async() =>{
        const res = await axios({
        url:`http://localhost:8080/api/carts/${cid}`,
        method: 'DELETE',
        withCredentials: true,
      })
        const data = res.data
        if (data.status == "success") {
          Swal.fire({
            title: `${data.message}`,
            icon: `${data.status}`,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continuar",
          }).then((result) => {
            if (result.isConfirmed) {navigate('/')}
          });

    }
  }


 
   useEffect(()=>{
      
    const renderCart = async()=>{
        
   try {  
      const res = await axios({
      url:`http://localhost:8080/api/carts/${cid}`,
      method: 'GET',
      whitCredentials:true,
  }) 
   
   const data = res.data
   
    setDataCart(data.payload.products)
    setPriceTotal(data.payload.priceTotal)
     
   if (data.status == "error") {
    Swal.fire({
      title: `${data.message}`,
      icon: `${data.status}`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (dataCart.length === 0){
          navigate('/')
      }
      }
    });
  }
   
   
     
   } catch (error) {
    console.log(error)  
  }}
  renderCart() 
 },[])
         
      return(
       <section className="container"> 
        <div className="descripcion row mt-3 p-2 d-flex justify-content-around text-center">
          <span className="col-2 d-none d-md-block">Foto</span>
          <span className="col-2 ">Desc.</span>
          <span className="col-2 ">Cant.</span>
          <span className="col-2 d-none d-md-block">Prec.</span>
          <span className="col-2 ">S.total</span>
          <span className="col-2 ">Eliminar</span>
        </div>
            {dataCart.map((product)=> {
                return (
                 <div key={product.product._id} className=" row mt-4  d-flex justify-content-around text-center align-items-center">
                    <div className="col-2 d-none d-md-block"><img src={product.product.thumbnail} width="100" className="img-fluid" alt={product.title} /></div> 
                    <div className="col-2 text ">{product.product.title}</div>
                    <div className="col-2 text ">{product.quantity}</div>
                    <div className="col-2 text d-none d-md-block">$ {product.price}</div>
                    <div className="col-2 text ">$ {product.quantity * product.price}</div>
                    <div className="col-2 eliminar">
                    <i className="bi bi-archive-fill" onClick={() => {RemoveItem(product.product._id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-archive-fill m-2" viewBox="0 0 16 16">
                      <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                    </svg>
                    </i>
                    </div>
                   
                </div>
              )
            })}
           
            <div className="descripcion row mt-4">
              <div className="col-12 d-flex justify-content-between">
                <h5 className="total p-2 m-0  " > Total $  {priceTotal}</h5>
                <Link to={`/stripe/${cid}`}  type="button" className="btn btn-primary m-2" style={{ textDecoration: 'none'}}>Procesar Compra</Link>
                <Link to="/"  type="button" className="btn btn-primary m-2" style={{ textDecoration: 'none'}}>Seguir Agregando</Link>
                <span>
                  <i className="bi bi-archive-fill" onClick={() => {ClearCart(cid)}}>Vaciar Carrito
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-archive-fill m-2" viewBox="0 0 16 16">
                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                  </svg>
                 </i>
               </span>
              </div>
            </div>
        </section> 
      
        )
}
export default Cart;

