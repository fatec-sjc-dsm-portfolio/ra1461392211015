import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { useAuth } from "../Context/authContext";
import api from '../Services/Axios';

export default function SelectFazendaTalhaoArmadilhas() {
  const navigation = useNavigation();
  const [fazendas, setFazendas] = useState([]);
  const [selectedFazenda, setSelectedFazenda] = useState('');

  const [talhoes, setTalhoes] = useState([]);
  const [selectedTalhao, setSelectedTalhao] = useState('');

  const [armadilhas, setArmadilhas] = useState([]);
  const [selectedArmadilha, setSelectedArmadilha] = useState('');

  const [fazendaLoading, setFazendaLoading] = useState(true);
  const [talhoesLoading, setTalhoesLoading] = useState(true);
  const [armadilhasLoading, setArmadilhasLoading] = useState(true);
  const { idUser } = useAuth();

  useEffect(() => {
    const fetchFazendas = async () => {
      try {
        const response = await api.get(`/fazendas/user/${idUser}`);
        setFazendas(response.data);
        setFazendaLoading(false);
      } catch (error) {
        console.error('Erro ao obter fazendas:', error);
        setFazendaLoading(false); 
      }
    };

    fetchFazendas();
  }, []);

  useEffect(() => {
    if (selectedFazenda) {
      const fetchTalhoes = async () => {
        try {
          const response = await api.get(`/talhoes/findByIdFazenda/${selectedFazenda}`);
          if (response.data == "") {
            setTalhoesLoading(true);
            Alert.alert('Aviso', 'Esta Fazenda não possui talhões cadastrados. Selecione uma Fazenda válida!');
          } else {
            setTalhoes(response.data);
            setTalhoesLoading(false);
          }
        } catch (error) {
          console.error('Erro ao obter talhões:', error);
          setTalhoesLoading(false);
        }
      };
      fetchTalhoes();
    }
  }, [selectedFazenda]);

  useEffect(() => {
    if (selectedTalhao) {
      const fetchArmadilhas = async () => {
        try {
          const response = await api.get(`/armadilhas/findByIdTalhao/${selectedTalhao}`);
          if (response.data == "") {
            setArmadilhasLoading(true);
            Alert.alert('Aviso', 'Este Talhão não possui armadilhas cadastradas. Selecione um Talhão válido!');
          } else {
            setArmadilhas(response.data);
            setArmadilhasLoading(false);
          }
        } catch (error) {
          console.error('Erro ao obter armadilhas:', error);
          setArmadilhasLoading(false);
        }
      };
      fetchArmadilhas();
    }
  }, [selectedTalhao]);


  const buttonAvançar = async() => {
    if(selectedArmadilha && selectedTalhao && selectedArmadilha) {
      navigation.navigate('Camera', { idArmadilha: selectedArmadilha })
    } else {
      Alert.alert('Erro', 'Selecione uma armadilha válida!');
    }
    

  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="arrow-back" size={45} color="#F45D16" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Cadastrar Imagens</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {fazendaLoading ? (
          <ActivityIndicator size="large" color="#F45D16" />
        ) : (
          <View style={styles.content}>
            <Text style={styles.title}>Selecione uma fazenda</Text>
            <Picker
              selectedValue={selectedFazenda}
              onValueChange={(itemValue) => setSelectedFazenda(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma fazenda" value="" />
              {fazendas.map(option => (
                <Picker.Item key={option.id_fazenda} label={option.nome_fazenda} value={option.id_fazenda} />
              ))}
            </Picker>

            {talhoesLoading ? null : (
              <>
                <Text style={styles.title}>Selecione um Talhão</Text>
                <Picker
                  selectedValue={selectedTalhao}
                  onValueChange={(itemValue) => setSelectedTalhao(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione um talhão" value="" />
                  {talhoes.map(option => (
                    <Picker.Item key={option.id_talhao} label={option.nome_talhao} value={option.id_talhao} />
                  ))}
                </Picker>

                {armadilhasLoading ? null : (
                  <>
                    <Text style={styles.title}>Selecione uma Armadilha</Text>
                    <Picker
                      selectedValue={selectedArmadilha}
                      onValueChange={(itemValue) => setSelectedArmadilha(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Selecione uma armadilha" value="" />
                      {armadilhas.map(option => (
                        <Picker.Item key={option.id_armadilha} label={option.id_armadilha} value={option.id_armadilha} />
                      ))}
                    </Picker>
                  </>
                )}
              </>
            )}
            <TouchableOpacity style={styles.registerButton} onPress={buttonAvançar}>
              <Text style={styles.registerButtonText}>Avançar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323335',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 50
  },
  icon: {
    marginRight: 10,
  },
  mainTitle: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#F45D16',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
