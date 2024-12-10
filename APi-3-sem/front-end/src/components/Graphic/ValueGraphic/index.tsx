import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Parcela, dadosTitulos } from "../../../utils/axios.routes";

export const ValueGraphic = () => {
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

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    "Parcelas pendentes": true,
    "Parcelas creditadas": true,
    "Parcelas vencidas": true,
    "Parcelas a vencer": true,
  });

  const handleCheckboxChange = (event: {
    target: { name: any; checked: any };
  }) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const data = [];
  const datainicial = new Date(inicio);
  const datafinal = new Date(fim);

  for (
    let data_for = new Date(datainicial);
    data_for <= datafinal;
    data_for.setDate(data_for.getDate() + 1)
  ) {
    const PagamentoAguardo = parcelas.reduce((acc: any, parcela: any) => {
      const data_pagamento = new Date(parcela.data_pagamento);
      const data_credito = new Date(parcela.data_credito);
      data_pagamento.setHours(data_pagamento.getHours() + 3);
      if (
        parcela.status == true &&
        data_pagamento < data_for &&
        data_credito >= data_for
      ) {
        return acc + parcela.valor_pago;
      } else {
        return acc;
      }
    }, 0);

    const PagamentoAprovado = parcelas.reduce((acc: any, parcela: any) => {
      const data_credito = new Date(parcela.data_pagamento);
      data_credito.setHours(data_credito.getHours() + 3);
      if (parcela.status == true && data_credito < data_for) {
        return acc + parcela.valor_pago;
      } else {
        return acc;
      }
    }, 0);

    const PagamentoVencido = parcelas.reduce((acc: any, parcela: any) => {
      const data_vencimento = new Date(parcela.data_vencimento);

      data_vencimento.setHours(data_vencimento.getHours() + 3);
      if (parcela.status == false && data_vencimento < data_for) {
        return acc + parcela.valor;
      } else {
        return acc;
      }
    }, 0);

    const PagamentoAVencer = parcelas.reduce((acc: any, parcela: any) => {
      const data_vencimento = new Date(parcela.data_vencimento);
      data_vencimento.setHours(data_vencimento.getHours() + 3);
      if (data_vencimento >= data_for) {
        return acc + parcela.valor;
      } else {
        return acc;
      }
    }, 0);

    const dia = String(data_for.getDate()).padStart(2, "0");
    const mes = String(data_for.getMonth() + 1).padStart(2, "0");
    const ano = String(data_for.getFullYear());

    data.push({
      name: dia + "/" + mes + "/" + ano,
      "Valor pendente": PagamentoAguardo,
      "Valor creditado": PagamentoAprovado,
      "Valor vencido": PagamentoVencido,
      "Valor a vencer": PagamentoAVencer,
    });
  }

  const maiorValor = data.reduce((acc: any, item: any) => {
    const valor =
      item["Valor pendente"] +
      item["Valor creditado"] +
      item["Valor vencido"] +
      item["Valor a vencer"];
    return valor > acc ? valor : acc;
  }, 0);
  const tickValues = Array.from(
    { length: 10 },
    (_, i) => Math.round(maiorValor / 10) * i
  );

  return (
    <>
      {/* <h2 className="title-stats"> Valores Acúmulativos </h2> */}
      <div className="select-box">
        <div className="select-box-data">
          <div className="select-input">
            <h3>Data de Inicio</h3>
            <input
              type="date"
              value={inicio}
              max={fim}
              onChange={(ev) => setInicio(ev.target.value)}
            />
          </div>
          <div className="select-input">
            <h3>Data de Fim</h3>
            <input
              type="date"
              value={fim}
              min={inicio}
              onChange={(ev) => setFim(ev.target.value)}
            />
          </div>
        </div>
        <div className="select-box-status">
          <div className="select-check">
            <input
              type="checkbox"
              id="Parcelas pendentes"
              name="Parcelas pendentes"
              value="Parcelas pendentes"
              checked={checkboxes["Parcelas pendentes"]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="Parcelas pendentes">Pendentes</label>
          </div>
          <div className="select-check">
            <input
              type="checkbox"
              id="Parcelas creditadas"
              name="Parcelas creditadas"
              value="Parcelas creditadas"
              checked={checkboxes["Parcelas creditadas"]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="Parcelas creditadas">Creditadas</label>
          </div>
          <div className="select-check">
            <input
              type="checkbox"
              id="Parcelas vencidas"
              name="Parcelas vencidas"
              value="Parcelas vencidas"
              checked={checkboxes["Parcelas vencidas"]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="Parcelas vencidas">Vencidas</label>
          </div>
          <div className="select-check">
            <input
              type="checkbox"
              id="Parcelas a vencer"
              name="Parcelas a vencer"
              value="Parcelas a vencer"
              checked={checkboxes["Parcelas a vencer"]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="Parcelas a vencer">Parcelas a vencer</label>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="70%" height="70%">
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={tickValues} tickCount={7} />
          <Tooltip />
          {checkboxes["Parcelas pendentes"] && (
            <Bar dataKey={"Valor pendente"} barSize={20} fill="#FADA55" />
          )}
          {checkboxes["Parcelas creditadas"] && (
            <Bar dataKey={"Valor creditado"} barSize={20} fill="#6EFA9B" />
          )}
          {checkboxes["Parcelas vencidas"] && (
            <Bar dataKey={"Valor vencido"} barSize={20} fill="#FA4C48" />
          )}
          {checkboxes["Parcelas a vencer"] && (
            <Bar dataKey={"Valor a vencer"} barSize={20} fill="#3C45FA" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ValueGraphic;
