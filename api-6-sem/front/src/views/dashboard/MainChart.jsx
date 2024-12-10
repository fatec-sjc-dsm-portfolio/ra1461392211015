import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import dashboardService from '../../services/dashService'

const MainChart = () => {
  const chartRef = useRef(null)
  const [data, setData] = useState(null)
  const [dataGrafico, setDataGrafico] = useState([])
  const [labels, setLabels] = useState([])
  const [maiorNumero, setMaiorNumero] = useState(0)

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})` // Cor RGB sem transparência
  }

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const dadosGrafico = async () => {
    try {
      var dadosDePara = {
        January: 'Janeiro',
        February: 'Fevereiro',
        March: 'Março',
        April: 'Abril',
        May: 'Maio',
        June: 'Junho',
        July: 'Julho',
        August: 'Agosto',
        September: 'Setembro',
        October: 'Outubro',
        November: 'Novembro',
        December: 'Dezembro',
      }

      var dataSets = []
      var labels = []
      var maiorNumero = 0

      const response = await dashboardService.getDadosGrafico()
      if (response.length === 0) {
        return
      }

      for (let dado of response) {
        if (!labels.includes(dadosDePara[dado.nome_mes])) {
          labels.push(dadosDePara[dado.nome_mes])
        }
        const color = generateRandomColor()
        let item = {
          label: dado.nome_empresa,
          backgroundColor: color,
          borderColor: color,
          pointHoverBackgroundColor: color,
          borderWidth: 2,
          data: [],
          fill: false,
        }

        if (dado.total_acessos > maiorNumero) {
          maiorNumero = dado.total_acessos
        }

        if (dataSets.length === 0) {
          dataSets.push(item)
        } else if (dataSets.filter((item) => item.label === dado.nome_empresa).length === 0) {
          dataSets.push(item)
        }
      }

      for (let item of dataSets) {
        for (let lab of labels) {
          let dado = response.filter(
            (dado) => dado.nome_empresa === item.label && dadosDePara[dado.nome_mes] === lab,
          )

          if (dado.length === 0) {
            item.data.push(0)
          } else {
            item.data.push(dado[0].total_acessos)
          }
        }
      }

      setData(response)
      setDataGrafico(dataSets)
      setLabels(labels)
      setMaiorNumero(maiorNumero)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dadosGrafico()
  }, [])

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: labels,
          datasets: dataGrafico,
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: maiorNumero + 10,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil((maiorNumero + 10) / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
