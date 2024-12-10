import { AllUsers } from "../../../utils/axios.routes";
import "./style.css";
import React, { useEffect, useState } from 'react'
import ReactInputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";

type UserData = {
  cpf: string,
  data_geracao: string,
  valor: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function BilingInformation({ cpf, data_geracao, valor, updateFields }: UserFormProps) {
  const [Usuarios, setUsuarios] = useState<any>();
  const [nomeUsuario, setNomeUsuario] = useState<any>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const titulos = await AllUsers();
        const data = titulos?.data;
        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Usuarios && cpf) {
      const usuarioEncontrado = Usuarios.find((usuario: any) => usuario.cpf === cpf);
      if (usuarioEncontrado) {
        setNomeUsuario(usuarioEncontrado.nome);
      }
    }
  }, [cpf, Usuarios]);

  return (
    <div className="cont">
      <div className="row">
        <div className="full-box">
          <h1>CPF do cliente</h1>
          <div className="tel-plus">
            <ReactInputMask

              type="text"
              mask="999.999.999-99"
              placeholder="CPF do cliente"
              value={cpf} onChange={e => updateFields({ cpf: e.target.value })}
            />
          </div>
        </div>
        <div className="full-box">

          <h1>Nome do cliente</h1>
          <input
            type="text"
            value={nomeUsuario || ""}
            placeholder="Nome do cliente"
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="full-box">
          <h1>Data de geração</h1>
          <input
            type="date"
            placeholder="Data de Vencimento"
            value={new Date().toISOString().split('T')[0]}
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="full-box">
          <h1>Valor</h1>
          <CurrencyInput
            required
            placeholder="Valor"
            prefix="R$"
            decimalSeparator=","
            groupSeparator="."
            value={valor}
            onValueChange={(value) => updateFields({ valor: value?.replace("R$", "").replace(".", "").replace(",", ".") })}
            decimalScale={2}
            allowNegativeValue={false}
          />
        </div>
      </div>
    </div>
  )
}

