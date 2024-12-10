import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
} from "recharts";
import { Parcela, dadosTitulos } from "../../../utils/axios.routes";

export const ClientGraphic = () => {
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
  const hoje = new Date();
  const clientesInadimplentes = titulos.reduce((acc: any, titulo: any) => {
    if (titulo) {
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
    }
  }, 0);

  const clientesAdimplentes = titulos.reduce((acc: any, titulo: any) => {
    if (titulo) {
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
    }
  }, 0);

  console.log(clientesInadimplentes, clientesAdimplentes);


  if (clientesInadimplentes == 0 && clientesAdimplentes == 0) {
    return (
      <div className="noData">
        <h1>Não há dados para exibir</h1>
      </div>
    );
  }

  const data = [
    { name: "Clientes Adimplentes", value: clientesAdimplentes },
    { name: "Clientes Inadimplentes", value: clientesInadimplentes },
  ];

  const COLORS = ["#6EFA9B", "#FA4C48"];

  return (
    <>
      {/* <h2 className="title-stats"> Situação dos clientes </h2> */}
      <PieChart width={500} height={400}>
        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="graphic-container">
        <div className="graphic-box">
          <div className="graphic-color-green">

          </div>
          <p>Clientes Adimplentes</p>
        </div>
        <div className="graphic-box">
          <div  className="graphic-color-red">

          </div>
          <p>Clientes Inadimplentes</p>
        </div>
      </div>
    </>
  );
};

export default ClientGraphic;
