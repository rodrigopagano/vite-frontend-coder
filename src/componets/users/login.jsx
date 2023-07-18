import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../header/logo";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./login.css";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = ({ show, handleClose }) => {
  const fetchLogin = async (valores, { resetForm }) => {
   
   try {
        const res = await axios({
        url:"http://localhost:8080/api/session/login",
        method: 'POST',
        data: valores,
        withCredentials: true,
                
    }) 
    
    const data = res.data
  
    if (data.status == "error") {
      Swal.fire({
        title: `${data.message}`,
        icon: `${data.status}`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
          resetForm();
        }
      });
    } else {
      Swal.fire({
        title: `${data.message}`,
        icon: `${data.status}`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          
          resetForm();
          handleClose();
          localStorage.setItem('user',JSON.stringify(data.user))
          localStorage.setItem('token',JSON.stringify(data.token))
                                        
        }
      });
    }
    
  } catch (error) {
    Swal.fire({
      title: "error inesperado",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
        handleClose();
      }
    });
  }
} 
 
      

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.email) {
            errores.email = "Ingresar un Email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              "El Email solo puede contener letras, numeros, giones y guion bajo.";
          }

          if (!valores.password) {
            errores.password = "Ingresar un Password";
          } else if (!/^.{4,12}$/.test(valores.password)) {
            errores.password = "EL password debe contener de 4 a 12 digitos";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          fetchLogin(valores, { resetForm });
        }}
      >
        {({ errors }) => (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="formulario">
                <div>
                  <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Correo@correo.com"
                    id="email"
                    
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className="error">{errors.email}</div>
                    )}
                  />
                </div>

                <div>
                  <label>Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="1234"
                    id="password"
                    
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className="error">{errors.password}</div>
                    )}
                  />
                </div>
                <button type="submit">Enviar</button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
};
export default Login;
