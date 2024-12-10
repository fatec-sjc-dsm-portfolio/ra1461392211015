import React, { createContext, useState, useContext } from 'react';
import api from '../Services/Axios';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [idUser, setIdUser] = useState(null)

    // tem q alterar antes de subir, deixei assim só pra testar
    const [role, setRole] = useState('admin')

  
    const getUserByEmail = async (email) => {
        try {
          const response = await api.get(`/users/email/${email}`); 
          return response.data;
        } catch (error) {
          console.error('Erro ao obter informações do usuário:', error);
          throw error;
        }
      };
 

  
    return (
      <AuthContext.Provider value={{ getUserByEmail, idUser, setIdUser ,role, setRole}}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);