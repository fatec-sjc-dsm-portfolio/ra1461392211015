import "./style.css";
import Navbar from "../../components/Navbar";
import React, { FormEvent, useEffect, useState, useContext } from 'react'
import { baixaParcela, criarLog, dadosUsuario, updateParcela } from '../../utils/axios.routes';
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";

const Payout = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext);
  const [data, setData] = useState<any>();
  const [parcela, setParcela] = useState<any>();
  const [usuario, setUsuario] = useState<any>();
  const { id } = useParams<{ id: string }>();
  const [valorPago, setValorPago] = useState("");
  const [dataPagamento, setDataPagamento] = useState<any>();
  const [dataCredito, setDataCredito] = useState("");
  const [titulo, setTitulo] = useState("");

  async function submitdata(valorPago: String , dataCredito: String ,dataPagamento: String ) {
    try {
      await updateParcela(id, valorPago, dataCredito, dataPagamento);
      const valorPagoFloat = parseFloat(valorPago.replace('R$', '').replace(',', '.'));
      console.log(valorPagoFloat, parcela?.valor);
      if ( valorPagoFloat < parcela?.valor) {
        toast.error('Valor pago menor que o valor da parcela. Por favor, tente novamente.');
        const erro = true;
      } else {
        toast.success('Pagamento realizado com sucesso!');
        navigate('/home');
        const erro = false;
      }
      await criarLog({
        idFuncionario: funcionario.cpf,
        idCliente: usuario?.cpf,
        descricao: `O funcionario ${funcionario.nome} acabou de dar baixa na parcela numero ${id} do cliente ${usuario?.nome}`
      })
    } catch (error) {
      console.error(error);
      toast.error('Erro ao pagar a parcela. Por favor, tente novamente.');
    }
  }

  function onsubmit(e: FormEvent) {
    e.preventDefault()
    console.log(e);
    submitdata(valorPago , dataCredito , dataPagamento)
  }

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
    const fetchParcela = async () => {
      try {
        const response = await baixaParcela(id);
        const data = await response?.data;

        const dataUsuario = await response?.data.cliente;
        setUsuario(dataUsuario);
        setParcela(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParcela();
  }, [id]);

  if (isLogged && (funcionario.cargo == 'Administrador' || funcionario.cargo == 'Financeiro')) {

    const ValorFormatado = parcela?.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return (
      <>
        <Navbar />
        <div className="payout-container">
          <div className="title">
            <h1> Confirmação de Pagamento</h1>
          </div>
          <form onSubmit={onsubmit}>
            <div className="box-payout">
              <div className="information-payout">
                <h2>
                  {" "}
                  <b>Nome: {usuario?.nome}</b>
                </h2>
                {/* <h2>
              {" "}
              <b>Titulo:</b> Nome do titulo
            </h2> */}
                <h2>
                  {" "}
                  <b>Valor da Parcela: {ValorFormatado}</b>
                </h2>
                <h2>
                  {" "}
                  <b>Data de Vencimento: {parcela?.data_vencimento.split('-').reverse().join('/')}</b>
                </h2>
              </div>
              <hr></hr>
              <div className="box-date">
                <div className="input-date">
                  <h1>Valor do Pagamento</h1>
                  <CurrencyInput
                    required
                    placeholder="Valor"
                    prefix="R$"
                    decimalSeparator=","
                    groupSeparator="."
                    value={valorPago}
                    onValueChange={(value) => setValorPago(value as string)}
                    decimalScale={2}
                    allowNegativeValue={false}
                  />
                </div>
                <div className="input-date">
                  <h1>Data de Crédito</h1>
                  <input
                    required
                    type="date"
                    value={dataCredito}
                    onChange={(value) => setDataCredito(value.target.value)}
                  />
                </div>
                <div className="input-date">
                  <h1>Data de Pagamento</h1>
                  <input
                    required
                    type="date"
                    value={dataPagamento}
                    onChange={(value) => setDataPagamento(value.target.value)}
                  />
                </div>
              </div>
              <div className="button-payout">
                <button className="enter-button" type="submit"> Confirmar </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <></>
    )
  }
};

export default Payout;