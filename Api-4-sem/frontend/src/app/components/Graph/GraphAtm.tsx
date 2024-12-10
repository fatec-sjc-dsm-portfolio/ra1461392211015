import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';

interface GraphProps {
  startDate?: string;
  endDate?: string;
  selectedCardId?: number
}

const GraphAtm: React.FC<GraphProps> = ({ startDate, endDate, selectedCardId }) => {

  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const dataAtual = new Date();

  async function medidas(startUnixtime: number, endUnixtime: number) {
    startUnixtime = Math.round(startUnixtime / 1000);
    endUnixtime = Math.round(endUnixtime / 1000) - 1;

    try {
      const response = await Axios.get(
        `http://127.0.0.1:3001/Medida/coletaDados/${selectedCardId}/${startUnixtime}/${endUnixtime}`
      );

      const dataPluv = response.data.pressao;

      if (dataPluv !== undefined && dataPluv.length > 0) {
        const soma = dataPluv.reduce((acc: number, pluv: any) => acc + pluv.valor_medida, 0);
        const media = soma / dataPluv.length;
        return media;
      } else {
        return 0;
      }
    } catch (error) {
      console.error(error);
      throw error; // rethrow the error to handle it at the caller level
    }
  }

  async function makeCategories(diaInicial: string, diaFinal: string, intervalo: number): Promise<[string[], number[]]> {
    let lista = [];
    let dados = [];
    let dataInicial = new Date(diaInicial);
    let dataFinal = new Date(diaFinal);
    dataInicial.setTime(dataInicial.getTime() + 3 * 60 * 60 * 1000);
    dataFinal.setTime(dataFinal.getTime() + 27 * 60 * 60 * 1000);

    if (dataAtual < dataFinal) {
      dataFinal = dataAtual;
    }

    if (intervalo >= 24 * 30) {

      const mesesAbreviados = [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
        'jul', 'ago', 'set', 'out', 'nov', 'dez'
      ];

      let key

      if (dataInicial.getFullYear() !== dataFinal.getFullYear()) {
        key = true
      }

      while (dataInicial.toISOString().slice(0, 7) <= dataFinal.toISOString().slice(0, 7)) {
        let mes = dataInicial.getMonth();
        let ano = dataInicial.getFullYear();
        let mesAbreviado = mesesAbreviados[mes];
        let formatoDiaMesAno = mesAbreviado;

        if (key) {
          formatoDiaMesAno += ` ${ano}`;
        }

        lista.push(formatoDiaMesAno);

        try {
          const dataFinalMes = new Date(dataInicial);
          dataFinalMes.setMonth(dataFinalMes.getMonth() + 1);

          const media = await medidas(dataInicial.getTime(), dataFinalMes.getTime());
          dados.push(media);
        } catch (error) {
          console.error(error);
        }

        dataInicial.setMonth(dataInicial.getMonth() + 1);
      }

    } else if (intervalo >= 24) {

      let intervaloNor = intervalo / 24

      while (dataInicial.toISOString().slice(0, 10) <= dataFinal.toISOString().slice(0, 10)) {

        let dia = dataInicial.getDate();
        let mes = dataInicial.getMonth() + 1;
        let formatoDiaMes = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}`;
        lista.push(formatoDiaMes);

        try {
          const media = await medidas(dataInicial.getTime(), dataInicial.getTime() + intervaloNor * 24 * 60 * 60 * 1000);
          dados.push(media);
        } catch (error) {
          console.error(error);
        }

        dataInicial.setDate(dataInicial.getDate() + intervaloNor);
      }

    } else if (intervalo < 24) {
      while (dataInicial < dataFinal) {
        let dia = dataInicial.getDate();
        let mes = dataInicial.getMonth() + 1;
        let formatoDiaMes = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}`;

        let hora = dataInicial.getHours();
        let formatoHora = `${hora < 10 ? '0' : ''}${hora}h`;

        let formatoFinal = `${formatoDiaMes} - ${formatoHora}`;
        lista.push(formatoFinal);

        try {
          const media = await medidas(dataInicial.getTime(), dataInicial.getTime() + intervalo * 60 * 60 * 1000);
          dados.push(media);
        } catch (error) {
          console.error(error);
        }

        dataInicial.setTime(dataInicial.getTime() + intervalo * 60 * 60 * 1000);
      }
    }


    var resp: [string[], number[]] = [lista, dados];

    return resp;
  }



  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const diffInMilliseconds = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        var diffInMonths = 0;

        if (diffInDays !== 0) {
          diffInMonths = Math.floor(diffInDays / 30);
        }

        if (diffInDays === 0) {
          let make = await makeCategories(startDate, endDate, 1);
          setCategories(make[0]);
          setData(make[1])
        } else if (diffInDays === 1) {
          let make = await makeCategories(startDate, endDate, 3);
          setCategories(make[0]);
          setData(make[1])
        } else if (5 > diffInDays && diffInDays > 1) {
          let make = await makeCategories(startDate, endDate, 6);
          setCategories(make[0]);
          setData(make[1])
        } else if (7 > diffInDays && diffInDays >= 5) {
          let make = await makeCategories(startDate, endDate, 12);
          setCategories(make[0]);
          setData(make[1])
        } else if (21 > diffInDays && diffInDays >= 7) {
          let make = await makeCategories(startDate, endDate, 24);
          setCategories(make[0]);
          setData(make[1])
        } else if (30 > diffInDays && diffInDays >= 21) {
          let make = await makeCategories(startDate, endDate, 24 * 2);
          setCategories(make[0]);
          setData(make[1])
        } else if (1 > diffInMonths && diffInDays >= 30) {
          let make = await makeCategories(startDate, endDate, 24 * 3);
          setCategories(make[0]);
          setData(make[1])
        } else if (6 > diffInMonths && diffInMonths >= 2) {
          let make = await makeCategories(startDate, endDate, 24 * 7);
          setCategories(make[0]);
          setData(make[1])
        } else {
          let make = await makeCategories(startDate, endDate, 24 * 30);
          setCategories(make[0]);
          setData(make[1])
        }
      }
    };

    fetchData();    

  }, [startDate, endDate]);


  const options = {
    series: {
      name: 'Pressão',
      marker: {
        symbol: 'diamond'
      },
      data: data
    },
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Pressão Atmosférica',
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: 'Pressão',
      },
      labels: {
        format: '{value} hPa',
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={'CoreChart'}
        options={options}
      />
    </>
  )
}

export default GraphAtm;
