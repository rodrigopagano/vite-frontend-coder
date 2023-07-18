import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentForm = () => {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const { cart: cid } = JSON.parse(localStorage.getItem('user'));
 
  const handlerPurchase = async () => {
    
    try {
      const response = await axios({
      url:`http://localhost:8080/api/carts/${cid}/purchase`,
      method: 'POST',
      withCredentials: true,
    
    });
       const data = response.data
       
    } catch (error) {}
  };


  const handlerCleanCart = async () => {
    try {
       const response = await axios({
       url: `http://localhost:8080/api/carts/${cid}`,
       method: 'DELETE',
       withCredentials: true,
      });
      const data = response.data
      
    } catch (error) {
       
  };
}
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (!error) {
      Swal.fire({
        title: `El pago ha sido procesado con éxito `,
        icon: `success`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          handlerPurchase();
          handlerCleanCart();
          navigate('/')
        }
      });
     
      
    } else {
      Swal.fire({
        title: `Error al procesar su Pago contactar al 0800 `,
        icon: `error`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/')
        }
      });
    }

  };
  return (
    <>
      <form className="container">
        <PaymentElement />
        <div className=" text-center m-2">
          <Button className="" onClick={handleSubmit}>
            Pagar
          </Button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
