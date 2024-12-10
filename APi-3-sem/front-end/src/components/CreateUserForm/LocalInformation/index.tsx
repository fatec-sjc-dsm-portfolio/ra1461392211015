import ReactInputMask from "react-input-mask";

import "./style.css";

type UserData = {
  nome: string,
  cpf: string,
  email: string,
  data: string,
  telefone: string,
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}


export function LocalInformation({ nome, cpf, email, data, telefone, updateFields }: UserFormProps) {

  return (
    <div className="cont">
      <div className="row">
        <div className="first-box">
          <h1>Nome Completo</h1>
          <input
            required
            type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={e => updateFields({ nome: e.target.value })}
          />
        </div>
        <div className="second-box">
          <h1>CPF</h1>
          <ReactInputMask
            maskPlaceholder="_"
            mask="999.999.999-99"
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => updateFields({ cpf: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        <div className="first-box">
          <h1>Email</h1>
          <input
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => updateFields({ email: e.target.value })}
          />
        </div>
        <div className="second-box">
          <h1>Data de nascimento</h1>
          <input
            required
            type="date"
            min={"1900-01-01"}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
            placeholder="Data de nascimento"
            value={data}
            onChange={e => updateFields({ data: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="box-tel">
          <h1>Telefone</h1>
          <div className="tel-plus">
            <input
              required
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={e => updateFields({ telefone: e.target.value })}
            />
          </div>
        </div>
      </div>

    </div>
  )
}