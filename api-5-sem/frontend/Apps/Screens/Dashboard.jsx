import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CardTotal from '../Components/cardTotal';
import api from '../Services/Axios';
import { useAuth } from "../Context/authContext";
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [fazendas, setFazendas] = useState([]);
  const [talhoes, setTalhoes] = useState([]);
  const [armadilhas, setArmadilhas] = useState([]);
  // const [pragasPorArmadilha, setPragasPorArmadilha] = useState([]);


  const { idUser } = useAuth();

  useEffect(() => {
    async function fetchFazendas() {
      try {
        const response = await api.get(`/fazendas/user/${idUser}`);
        if (Array.isArray(response.data)) {
          setFazendas(response.data);
        } else {
          console.error(`Esperava-se um array, mas obteve-se: ${typeof response.data}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar fazendas:', error);
        setIsLoading(false);
      }
    }

    fetchFazendas();
  }, [idUser]);


  // const getPragasPorArmadilha = async () => {
  //   try {
  //     const response = await api.get(`/dados-armadilhas`);
  //     if (Array.isArray(response.data)) {
  //       setPragasPorArmadilha(response.data);
  //     } else {
  //       console.error(`Esperava-se um array, mas obteve-se: ${typeof response.data}`);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar dados de pragas por armadilha:', error);
  //   }
  // };  

  const getArmadilhasTalhoes = async (id_talhoes) => {
    try {
      let allArmadilhas = [];
      for (let id_talhao of id_talhoes) {
        const response_armadilhas = await api.get(`/armadilhas/findByIdTalhao/${id_talhao}`);
        if (Array.isArray(response_armadilhas.data)) {
          allArmadilhas.push(...response_armadilhas.data);
        } else if (typeof response_armadilhas.data === 'object' && response_armadilhas.data !== null) {
          allArmadilhas.push(response_armadilhas.data);
        } else {
          console.error(`Esperava-se um array ou objeto, mas obteve-se: ${typeof response_armadilhas.data}`);
        }
      }
      setArmadilhas(allArmadilhas);
      console.log('Armadilhas:', allArmadilhas);
    } catch (error) {
      console.error('Erro ao buscar armadilhas:', error);
    }
  };

  const getTotalTalhoes = async (id_fazenda) => {
    try {
      const response_talhoes = await api.get(`/talhoes/findByIdFazenda/${id_fazenda}`);
      if (Array.isArray(response_talhoes.data)) {
        const talhoesData = response_talhoes.data;
        setTalhoes(talhoesData);
        const id_talhoes = talhoesData.map(t => t.id_talhao);
        await getArmadilhasTalhoes(id_talhoes);
      } else if (typeof response_talhoes.data === 'object' && response_talhoes.data !== null) {
        const talhoesData = [response_talhoes.data];
        setTalhoes(talhoesData);
        const id_talhoes = talhoesData.map(t => t.id_talhao);
        await getArmadilhasTalhoes(id_talhoes);
      } else {
        console.error(`Esperava-se um array ou objeto, mas obteve-se: ${typeof response_talhoes.data}`);
      }
    } catch (error) {
      console.error('Erro ao buscar talhoes:', error);
    }
  };

  const handleSubmitFazenda = async (value) => {
    setSelectedValue(value);
    if (value) {
      await getTotalTalhoes(value);
    } else {
      setTalhoes([]);
      setArmadilhas([]);
    }
  };

  const armadilhasPorTalhao = talhoes.map(talhao => {
    const count = armadilhas.filter(armadilha => armadilha["talhao"].id_talhao === talhao.id_talhao).length;
    return count;
  });

  // const pragaPorArmadilhaData = {
  //   labels: armadilhas.map(armadilha => `Armadilha ${armadilha.id_armadilha}`),
  //   datasets: [
  //     {
  //       data: armadilhas.map(armadilha => {
  //         const praga = pragasPorArmadilha.find(item => item.id_armadilha === armadilha.id_armadilha);
  //         return praga ? praga.quantidade : 0;
  //       })
  //     }
  //   ]
  // };

  const data = {
    labels: talhoes.map(t => t.nome_talhao),
    datasets: [
      {
        data: armadilhasPorTalhao
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "#323335",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  return (
    <ScrollView>
      <Text style={styles.textTitle}>Dashboard</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma fazenda', value: undefined }}
        items={fazendas.map(fazenda => ({
          label: fazenda.nome_fazenda,
          value: fazenda.id_fazenda
        }))}
        onValueChange={(value) => handleSubmitFazenda(value)}
        style={pickerSelectStyles}
        value={selectedValue}
      />

      <View style={styles.boxContainer}>
        <CardTotal title='Total de Talhões' number={talhoes.length.toString()} subTitle='campos cadastrados' type='talhoes' />
        <CardTotal title='Total de Armadilhas' number={armadilhas.length.toString()} subTitle='fotos cadastradas' type='armadilhaJson' />
      </View>

      {selectedValue && talhoes.length > 0 && (
        <>
          <Text style={styles.textChart}>Quantidade de armadilhas por talhões:</Text>
          <ScrollView horizontal>
            <BarChart
              style={styles.chart}
              data={data}
              width={Math.max(screenWidth, talhoes.length * 100)}
              height={280}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </ScrollView>
          {/* <ScrollView horizontal>
            <BarChart
              data={pragaPorArmadilhaData}
              width={screenWidth}
              height={280}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </ScrollView>
          <Text style={styles.footerText}>Agro Vision</Text> */}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textChart: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 80,
    fontSize: 18,
  },
  textTitle: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 300,
    fontSize: 16,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    borderRadius: 15,
  },
  inputAndroid: {
    width: 300,
    fontSize: 16,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    borderRadius: 15,
  },
});
