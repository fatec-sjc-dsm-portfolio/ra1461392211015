import React, { useEffect, useState, useContext } from 'react'
import { dadosUsuario } from '../../utils/axios.routes';
import PaymentForm from '../../components/CreatePaymentForm'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PayForm = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext)
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  
  }, []);
  if (isLogged && (funcionario.cargo == 'Administrador' || funcionario.cargo == 'Comercial')) {

    return (
      <>
        <Navbar />
        <main>
          <PaymentForm />
        </main>
      </>
    );
  } else {
    return (
      <></>
    )
  }
};

export default PayForm;
