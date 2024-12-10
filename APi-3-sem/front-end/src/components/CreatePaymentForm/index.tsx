import React, { FormEvent, useContext, useState } from 'react'
import { useMultistepForm } from '../../utils/function'
import { BilingInformation } from './BilingInformation'
import { PersonalInformation } from './PersonalInformation'
import '../../styles/global.css'
import { criarLog, criarTitulo } from '../../utils/axios.routes'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/AuthContext'


const PaymentForm = () => {
  const { isLogged, funcionario } = useContext(AuthContext)
  const navigate = useNavigate();
  type FormData = {
    cpf: string,
    id_funcionario: string,
    codigo_barra: string,
    data_geracao: string,
    nome_produto: string,
    parcelas: string,
    valor: string,
  }
  const INITIAL_DATA: FormData = {
    cpf: "",
    id_funcionario: "",
    codigo_barra: "",
    data_geracao: "",
    nome_produto: "",
    parcelas: "",
    valor: "",
  }
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back } =
    useMultistepForm([
      <PersonalInformation {...data} updateFields={updateFields} />,
      <BilingInformation {...data} updateFields={updateFields} />,
    ])

  async function submitData(data: any) {
    try {
      let cpf = data.cpf;
      data.id_funcionario = funcionario.cpf
      let codigo_barra = data.codigo_barra;
      data.data_geracao = new Date
      let nome_produto = data.nome_produto;
      data.parcelas = 12;
      let valor = parseFloat(data.valor);

      if (cpf == null || !cpf) {
        toast.warning("O Campo CPF não está preenchido!");
      }
      if (codigo_barra == null || !codigo_barra) {
        toast.warning("O Campo Código de Barra não está preenchido!");
      }
      if (data.data_geracao == null || !data.data_geracao) {
        toast.warning("O Campo Data Geração não está preenchido!");
      }
      if (nome_produto == null || !nome_produto) {
        toast.warning("O Campo Nome Do Produto não está preenchido!");
      }
      if (data.parcelas == null || !data.parcelas) {
        toast.warning("O Campo Parcelas não está preenchido!");
      }
      if (valor == null || !valor) {
        toast.warning("O Campo valor não está preenchido!");
      }
      if (cpf && codigo_barra && data.data_geracao && nome_produto && data.parcelas && valor) {
        var resp = await criarTitulo(data);
        if (resp?.status == 201) {
          toast.success('Título criado com sucesso!');
          await criarLog({
            idFuncionario: funcionario.cpf,
            idCliente: data.cpf,
            descricao: `O funcionario ${funcionario.nome} acabou de cadastrar o Titulo`
          })
          return true;
        }
        toast.error('Erro ao criar titulo, tente novamente mais tarde!')
        return false
      }
    } catch (error) {
      toast.error('Não foi possível criar o título. Por favor, tente novamente mais tarde.');
      console.error(error);
      return false;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      submitData(data).then((success) => {
        if (success) {
          navigate('/home');
        }
      });
    }
    next();
  }
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Emitir Título</h2>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
        </form>
        <div className='btn-form'>
          {!isFirstStep && <button className="red" type="button" onClick={back}>Voltar</button>}
          <button className="green" type="submit" onClick={onSubmit}>
            {isLastStep ? "Concluir" : "Avançar"}
          </button>
        </div>
      </div>

    </>

  )

}

export default PaymentForm
