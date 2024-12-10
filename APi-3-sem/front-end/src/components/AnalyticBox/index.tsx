import "./style.css";
import React, { useContext, useEffect, useState } from 'react'
import { dadosTitulos } from "../../utils/axios.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { Parcela } from "../../utils/axios.routes";


const AnalyticBox = () => {
  const [dados, setDados] = useState<any>();
  const { isLogged, funcionario } = useContext(AuthContext);
  const [titulos, setTitulos] = useState<any>([]);
  const [parcelas, setParcelas] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const titulos = await dadosTitulos();
        const titulosData = titulos?.data;
        const parcelas = await Parcela();
        const parcelasData = parcelas?.data;
        if (titulosData) {
          setTitulos(titulosData);
        }
        if (parcelasData) {
          setParcelas(parcelasData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("parcelas:", parcelas);
  const hoje = new Date();

  const valorPago = parcelas.reduce((acc: any, parcela: any) => {
    const dataCredito = new Date(parcela.data_credito);
    dataCredito.setHours(dataCredito.getHours() + 3);
    if (parcela.status == true && dataCredito < hoje) {
      return acc + parcela.valor_pago;
    } else {
      return acc;
    }
  }, 0);

  const valorAReceber = parcelas.reduce((acc: any, parcela: any) => {
    const dataCredito = new Date(parcela.data_credito);
    dataCredito.setHours(dataCredito.getHours() + 3);
    if (parcela.status == true && dataCredito > hoje) {
      return acc + parcela.valor_pago;
    } else {
      return acc;
    }
  }, 0);


  const clientesInadimplentes = titulos.reduce((acc: any, titulo: any) => {
    const parcelas = titulo.parcelas;
    const parcelasVencidas = parcelas.filter((parcela: any) => {
      const dataVencimento = new Date(parcela.data_vencimento);
      dataVencimento.setHours(dataVencimento.getHours() + 3);
      if (parcela.status == false && dataVencimento < hoje) {
        return parcela;
      }
    });
    if (parcelasVencidas.length > 0) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const clientesAdimplentes = titulos.reduce((acc: any, titulo: any) => {
    const parcelas = titulo.parcelas;
    const parcelasVencidas = parcelas.filter((parcela: any) => {
      const dataVencimento = new Date(parcela.data_vencimento);
      dataVencimento.setHours(dataVencimento.getHours() + 3);
      if (parcela.status == false && dataVencimento < hoje) {
        return parcela;
      }
    });
    if (parcelasVencidas.length == 0) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const titulosEmitidosHoje = titulos.reduce((acc: any, titulo: any) => {
    const data_geracao = new Date(titulo.data_geracao);
    data_geracao.setHours(data_geracao.getHours() + 3);
    if (data_geracao.getDate() == hoje.getDate() && data_geracao.getMonth() == hoje.getMonth() && data_geracao.getFullYear() == hoje.getFullYear()) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const parcelasPagasHoje = parcelas.reduce((acc: any, parcela: any) => {
    const data_pagamento = new Date(parcela.data_pagamento);
    data_pagamento.setHours(data_pagamento.getHours() + 3);
    if (data_pagamento.getDate() == hoje.getDate() && data_pagamento.getMonth() == hoje.getMonth() && data_pagamento.getFullYear() == hoje.getFullYear()) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const valorAReceberFormatado = valorAReceber.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const valorPagoFormatado = valorPago.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  if (isLogged) {
    if (funcionario.cargo == 'Administrador') {
      return (
        <>
          <div className="bg">
            <div className="box-container">
              <div className="box">
                <p>Valor creditado:</p>
                <h1>{valorPagoFormatado}</h1>
              </div>
              <div className="box">
                <p>Valor pendente:</p>
                <h1>{valorAReceberFormatado}</h1>
              </div>
              <div className="box">
                <p>Total de títulos emitidos:</p>
                <h1>{titulos.length}</h1>
              </div>
            </div>
          </div>
          <div className="grafico"></div>
        </>
      );
    } else if (funcionario.cargo == 'Financeiro') {
      return (
        <>
          <div className="bg">
            <div className="box-container">
              <div className="box">
                <p>Clientes inadimplentes:</p>
                <h1>{clientesInadimplentes}</h1>
              </div>
              <div className="box">
                <p>Clientes adimplentes:</p>
                <h1>{clientesAdimplentes}</h1>
              </div>
              <div className="box">
                <p>Parcelas pagas hoje:</p>
                <h1>{parcelasPagasHoje}</h1>
              </div>
            </div>
          </div>
          <div className="grafico"></div>
        </>
      )
    } else if (funcionario.cargo == 'Comercial') {
      return (
        <>
          <div className="bg">
            <div className="box-container">
              <div className="box">
                <p>Total de títulos emitidos:</p>
                <h1>{titulos.length}</h1>
              </div>
              <div className="box">
                <p>Total de títulos emitidos hoje:</p>
                <h1>{titulosEmitidosHoje}</h1>
              </div>
              <div className="box">
                <p>Total de clientes inadimplentes:</p>
                <h1>{clientesInadimplentes}</h1>
              </div>
            </div>
          </div>
          <div className="grafico"></div>
        </>
      )
    } else {
      return (
        <></>
      );
    }
  } else {
    return (
      <></>
    )
  }
};

export default AnalyticBox;
