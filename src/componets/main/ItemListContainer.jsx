import React, {useState, useEffect} from 'react';
import ItemsList from './itemList';
import axios from 'axios';

const ItemListContainer = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
      const renderProducts = async()=>{
        try {  
          const res = await axios({
          url:`http://localhost:8080/api/products`,
          method: 'GET',
         })         
        const data = res.data.payload
          setData(data.docs) 
        } catch (error) {
        console.log(error)  
      }}
      renderProducts() 
  }, []);




 
  return (
     <div className="container-fluid ">
        <h1 className="text-center">{`Bienvenido a la tienda de tecnologia`}</h1>
         {<ItemsList datos={data} />}
    </div>
  )
}
export default ItemListContainer;
