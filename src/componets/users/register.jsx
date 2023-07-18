import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../header/logo";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './login.css';
import Swal from "sweetalert2";

const Register = ({ show, handleClose }) => {
  
  return (
    <>
      <Formik
        initialValues={{
          firstName:'',
          lastName:'',
          age:'',
          email:'',
          password:''
        }}

        validate={(valores)=>{
            let errores = {}

            if(!valores.firstName){
                errores.firstName= 'Ingresar un Nombre'
             }else if(!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.firstName)) {
               errores.firstName= 'El Nombre solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.'
             }
             
             if(!valores.lastName){
                errores.lastName= 'Ingresar un Apellido'
             }else if(!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.lastName)) {
               errores.lastName= 'El Apellido solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.'
             }
             
             if(!valores.age){
                errores.age= 'Ingresar un edad'
             }else if(!/^\d{2}$/.test(valores.age)) {
               errores.age= 'La edad solo puede contener nuemros con maximo 3.'
             }


            if(!valores.email){
               errores.email= 'Ingresar un Email'
            }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
              errores.email= 'El Email solo puede contener letras, numeros, giones y guion bajo.'
            }

            if(!valores.password){
              errores.password= 'Ingresar un Password'
            }else if(!/^\d+$/.test(valores.password)) {
             errores.password= 'EL password debe contener solo numeros'
            }
          
            return errores

        }}

        onSubmit=  {async (valores,{resetForm})=>{
           await fetch("http://localhost:8080/api/session/register", {
             method: "POST",
             body: JSON.stringify(valores),
             headers: { "Content-type": "application/json",},
           })
             .then((res) => res.json())
             .then((data) => {
              console.log(data)
               if(data.status == "error"){
                  Swal.fire({
                    title: `${data.message}`,
                    icon:`${data.status}`,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Continuar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleClose()
                      resetForm()
                    }
                  });
                } else{
                    Swal.fire({
                        title: `${data.message}`,
                        icon:`${data.status}`,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Continuar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleClose()
                          resetForm()
                        }
                      });

                }
             })

             .catch((err) => {
              Swal.fire({
                title: "error inesperado",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm()
                  handleClose()
                 
                }
              });
              });
         }}
      >
         {({errors})=>(
              <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <Modal.Title className="text-center">Registro</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <Form className="formulario" >
                <div>
                    <label>Nombre</label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Rodrigo"
                      id="firstName"
                      
                      
                    />
                    <ErrorMessage name="firstName" component={()=>(
                      <div className="error">{errors.firstName}</div>
                    )}/>
                   
                </div>
                <div>
                    <label>Apellido</label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Pagano"
                      id="lastName"
                     
                    />
                    <ErrorMessage name="lastName" component={()=>(
                      <div className="error">{errors.lastName}</div>
                    )}/>
                   
                </div>

                <div>
                    <label>Edad</label>
                    <Field
                      type="text"
                      name="age"
                      placeholder="21"
                      id="age"
                      
                      
                    />
                    <ErrorMessage name="age" component={()=>(
                      <div className="error">{errors.age}</div>
                    )}/>
                   
                </div>





                  <div>
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Correo@correo.com"
                      id="email"
                     
                    />
                    <ErrorMessage name="email" component={()=>(
                      <div className="error">{errors.email}</div>
                    )}/>
                   
                   </div>
    
    
                   <div>
                    <label >Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="1234"
                      id="password"
                     
                    />
                    <ErrorMessage name="password" component={()=>(
                      <div className="error">{errors.password}</div>
                    )}/>
                   </div>
                       <button type="submit" >Enviar</button>
                      
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
         )}
         
      
      </ Formik>
    </>
  )
}
export default Register;
