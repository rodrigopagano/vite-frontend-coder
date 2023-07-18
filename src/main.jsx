import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './componets/header/Navbar'
import ItemListContainer from './componets/main/ItemListContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Cart from './componets/cart/cart'
import Stripe from './componets/stripe/Stripe'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     
       <Navbar />
          <Routes>
           <Route path="/" element={<ItemListContainer />}/>
           <Route path="/cart" element={<Cart />}/>
           <Route path="/stripe/:cid" element={<Stripe />} />
          </Routes>  
      
   </BrowserRouter>
)