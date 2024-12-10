'use client'

import { Provider } from "react-redux"
import store from "./store/store"
import { Field } from "./components/Field/field";

import { useEffect, useState } from 'react'
import Spinner from "./components/Spinner/sipinner";
import NavBar from "./components/Bars/navBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideNavBar from "./components/Bars/sideNavBar";
import Login from "./components/Pages/Login/login";
import CriarConta from "./components/Pages/Conta/conta";

interface TesteProps {
   children: React.ReactNode;
 }

const GlobalLayout: React.FC<TesteProps> = ({ children }) => {

   const [loading, setLoading] = useState(true);
   const [authenticated, setAuthenticated] = useState(false);
   const [registerUser, setRegisterUser] = useState(false);

   useEffect(() => {
     setTimeout(() => {
       setLoading(false);
     }, 1000);
   }, []);

   const handleAuthentication = () => {
      setAuthenticated(true)
   }

   const handleSetRegister = () => {
      setRegisterUser(true)
   }

   const handleSetLogin = () => {
      setRegisterUser(false)
   }

   return (
     <>
         <Provider store={store}>
            {loading ? (
               <Spinner />
            ) : registerUser ? <CriarConta authenticated={handleAuthentication} setLogin={handleSetLogin} />
               : authenticated ? (
                  <>
                     <Field
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent='center'
                        alignItems='center'
                        flexDirection="row"
                        gap="20px"
                        paddingLeft='1%'
                     >
                     <SideNavBar />
                     <Field 
                           width="87%"
                           height="95%"
                           display="flex"
                           flexDirection='column'
                           gap="20px"
                           // margin='20px'
                           paddingTop='40px'
                           paddingLeft='40px'
                     >
                        <NavBar />
                        <Field
                        >
                           {children}
                        </Field>
                     </Field>
                     </Field>
                     <ToastContainer />
                  </>
               ) : <Login authenticated={handleAuthentication} setRegister={handleSetRegister} />
            }
         </Provider>
     </>
   )
 }

 export default GlobalLayout;
