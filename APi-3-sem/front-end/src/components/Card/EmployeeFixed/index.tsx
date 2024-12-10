import React from "react";
import "./style.css";
import { excludeCliente, excludeFuncionario, updateFuncionario } from "../../../utils/axios.routes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

interface employeeProps {
  id_funcionario: any;
  nome: any;
  email: any;
  cpf: any;
  cargo: any;
  tipo: any;
}
const EmployeeFixed = ({ id_funcionario, nome, email, cpf, cargo, tipo }: employeeProps) => {

  async function onExclude(cpf: any) {

    await excludeFuncionario(cpf)
    toast.success('Funcionário excluído com sucesso!');

  }

  async function onUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const selectElement = document.querySelector('select[name="select"]') as HTMLSelectElement;
    const selectedValue = selectElement.value;
    await updateFuncionario(cpf, selectedValue)

    window.location.reload();
    toast.success('Cargo alterado com sucesso!');
  }

  if (tipo == "f") {

    return (
      <>
        <details className="card-wait">
          <summary className="outside-wait">
            <h1> <b> {cargo}  - </b>{nome}</h1>
            <img
              src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
              alt="expand-arrow"
            />
          </summary>
          <div className="inside-box">
            <div className="information-wait-box">
              <h2>
                <b> Id:</b>{id_funcionario}
              </h2>
              <h2>
                <b> Email:</b>{email}
              </h2>
              <h2>
                <b> CPF: </b>{cpf}
              </h2>
              <div className="select-function">
                <label> Definir um cargo:</label>
                {cargo == 'Financeiro' ?
                  <select name="select">
                    <option value="Financeiro" selected>Financeiro</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  :
                  ''
                }
                {cargo == 'Comercial' ?
                  <select name="select">
                    <option value="Financeiro">Financeiro</option>
                    <option value="Comercial" selected>Comercial</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  :
                  ''
                }
                {cargo == 'Administrador' ?
                  <select name="select">
                    <option value="Financeiro">Financeiro</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Administrador" selected>Administrador</option>
                  </select>
                  :
                  ''
                }
              </div>
            </div>
            <div className="box-confirm">
              <button className="deny" onClick={e => onExclude(cpf)}>Excluir</button>
              <button className="approve" onClick={e => onUpdate(e)}>Alterar</button>
            </div>
          </div>
        </details>
      </>
    );
  } else if (cpf == null) {

    return (
      <div className="information-wait-box">
        <h2>
          <b> Sem clientes Cadastrados</b>
        </h2>
      </div>
    );
  } else {
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
                <b> Email:</b>{email}
              </h2>
              <h2>
                <b> CPF: </b>{cpf}
              </h2>

            </div>
            <div className="box-confirm">
              <button className="deny" onClick={e => onExclude(e)}>Excluir</button>
              <button className="approve" onClick={e => onUpdate(e)}>Alterar</button>
            </div>
          </div>
        </details>
      </>
    );
  }
};

export default EmployeeFixed;
