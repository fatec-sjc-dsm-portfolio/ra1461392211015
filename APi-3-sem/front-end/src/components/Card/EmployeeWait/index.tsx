import React from "react";
import "./style.css";
import { excludeFuncionario, updateFuncionario } from "../../../utils/axios.routes";
import { toast } from "react-toastify";
interface employeeProps {
  id_funcionario: any;
  nome: any;
  email: any;
  cpf: any;
}
const EmployeeWait = ({ id_funcionario, nome, email, cpf }: employeeProps) => {

  async function onExclude(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await excludeFuncionario(cpf)
    toast.success('Funcionário recusado com sucesso!');
    window.location.reload();
  }

  async function onUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const selectElement = document.querySelector('select[name="select"]') as HTMLSelectElement;
    const selectedValue = selectElement.value;
    await updateFuncionario(cpf, selectedValue)
    toast.success('Funcionário aprovado com sucesso!');
    window.location.reload();
  }
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
              <select name="select">
                <option value="Financeiro">Financeiro</option>
                <option value="Comercial">Comercial</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
          </div>
          <div className="box-confirm">
            <button className="deny" onClick={e => onExclude(e)}>Recusar</button>
            <button className="approve" onClick={e => onUpdate(e)}>Confirmar</button>

          </div>
        </div>
      </details>
    </>
  );
};

export default EmployeeWait;
