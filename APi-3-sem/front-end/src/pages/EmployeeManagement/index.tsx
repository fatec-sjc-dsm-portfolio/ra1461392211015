import { dadosFuncionarios, dadosUsuario } from '../../utils/axios.routes';
import React, { useContext, useEffect, useState } from 'react'
import EmployeeWait from "../../components/Card/EmployeeWait";
import EmployeeFixed from "../../components/Card/EmployeeFixed";
import Navbar from "../../components/Navbar";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface Funcionario {
  credential: any;
  id_funcionario: number;
  nome: string;
  email: string;
  cpf: string;
  cargo: string | null;
}

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext);
  const [data, setData] = useState<any>();
  const [funcionarioo, setFuncionario] = useState<any>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const funcs = await dadosFuncionarios();
        const resp = await funcs?.data;
        setFuncionario(resp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredFuncionarios = funcionarioo?.filter((item: Funcionario) =>
    item.nome.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (isLogged && funcionario.cargo === 'Administrador') {

    return (
      <>
        <div className="conteiner-employee-management">
          <Navbar />
          <div className='head-gerenciarfunc'>
            <h1 className="title-primary">Lista de Funcionários</h1>
            <input type='text' className='input-table' placeholder='Digite aqui' value={searchValue} onChange={handleSearchChange} />
          </div>

          <h2 className="title-secundary">Solicitações Pendentes</h2>
          {filteredFuncionarios && filteredFuncionarios.length > 0 ? (
            <>
              {filteredFuncionarios.map((item: Funcionario) => {
                if (item.credential.role == null && item.credential.id != funcionario.id || item.cargo == undefined && item.credential.id != funcionario.id && item.credential.role == 'Sem_Cargo') {
                  return (
                    <React.Fragment key={item.cpf}>
                      <EmployeeWait id_funcionario={item.credential.id} nome={item.nome} email={item.email} cpf={item.cpf} />
                    </React.Fragment>
                  );
                } else if (
                  item.credential.role != null &&
                  item.credential.role != "Administrador" &&
                  item.credential.role != "Financeiro" &&
                  item.credential.role != "Comercial"
                ) {
                  return null; 
                }
              })}
            </>
          ) : (
            <h2>SEM SOLICITAÇÕES</h2>
          )}

          <h2 className="title-secundary">Funcionários do sistema</h2>
          {filteredFuncionarios && filteredFuncionarios.map((item: Funcionario) => {
            if (item.credential.role != null && item.cpf != funcionario.cpf && item.credential.role != 'Sem_Cargo') {
              return (
                <React.Fragment key={item.cpf}>
                  <EmployeeFixed id_funcionario={item.credential.id} nome={item.nome} email={item.email} cargo={item.credential.role} cpf={item.cpf} tipo={"f"} />
                </React.Fragment>
              );
            } else if (item.cargo != null && item.cargo != 'Administrador' && item.cargo != 'Financeiro' && item.cargo != 'Comercial') {
              return (
                <>
                  <h2>Sem Funcionarios Cadastrados</h2>
                </>
              );
            }
          })}
        </div>
      </>
    );
  } else {
    return (
      <></>
    )
  }
};

export default EmployeeManagement;
