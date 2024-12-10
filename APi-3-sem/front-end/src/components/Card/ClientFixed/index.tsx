import React, { FormEvent, useContext, useState } from 'react'
import "./style.css";
import { criarLog, excludeCliente, updateCliente } from "../../../utils/axios.routes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from '../../../contexts/AuthContext';

interface employeeProps {
  nome: any;
  email: any;
  cpf: any;
  telefone: any;
}
const ClientFixed = ({ nome, email, cpf, telefone }: employeeProps) => {
  const { isLogged, funcionario } = useContext(AuthContext)

  const navigate = useNavigate();

  async function onExclude(cpf: any) {

    let excloi = await excludeCliente(cpf)
    if (excloi?.status == 200) {
      toast.success('Cliente excluído com sucesso!');
      await criarLog({
        idFuncionario: funcionario.cpf,
        idCliente: cpf,
        descricao: `O funcionário ${funcionario.nome} excluiu o cliente ${nome}`
      })
    } else {
      toast.error('Erro ao excluir cliente!');
    }
  }

  async function onUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    navigate(`/updateUser/${cpf}`)
  }

  if (cpf != null && cpf != undefined && cpf != '') {

    return (
      <>
        <details className="card-wait">
          <summary className="outside-wait">
            <h1>{nome}</h1>
            <img
              src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
              alt="expand-arrow"
            />
          </summary>
          <div className="inside-box">
            <div className="information-wait-box">
              <h2>
                <b> Email: </b>{email}
              </h2>
              <h2>
                <b> CPF: </b>{cpf}
              </h2>
              <h2>
                <b> Telefone: </b>{telefone}
              </h2>

            </div>
            <div className="box-confirm">
              <button className="deny" onClick={e => onExclude(cpf)}>Excluir</button>
              <button className="approve" onClick={e => onUpdate(e)}>Alterar</button>
            </div>
          </div>
        </details>
      </>
    );
  } else {

    return (
      <div className="information-wait-box">
        <h2>
          <b> Sem clientes Cadastrados</b>
        </h2>
      </div>
    );
  }
};

export default ClientFixed;
