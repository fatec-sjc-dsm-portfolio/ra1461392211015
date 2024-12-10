import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../components/CreateUserForm'
import Navbar from '../../components/Navbar'
import { dadosUsuario } from '../../utils/axios.routes';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';


const CustomerForm = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext)
  const { id } = useParams<{ id: string }>();
  useEffect(() => {

    if (!isLogged) {
      navigate('/')
    }
  }, []);

  if (id != null) {
    if (isLogged && (funcionario.cargo = 'Administrador' || funcionario.cargo == 'Comercial')) {

      return (
        <>
          <Navbar />
          <main>
            <UserForm id={id} />
          </main>
        </>
      );
    } else {
      return (
        <></>
      )
    }
  }
  if (isLogged && (funcionario.cargo = 'Administrador' || funcionario.cargo == 'Comercial')) {

    return (
      <>
        <Navbar />
        <main>
          <UserForm />
        </main>
      </>
    );
  } else {
    return (
      <></>
    )
  }
};

export default CustomerForm;
