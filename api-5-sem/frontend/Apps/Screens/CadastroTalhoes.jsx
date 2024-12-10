import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { useAuth } from "../Context/authContext";
import api from '../Services/Axios';
import * as DocumentPicker from 'expo-document-picker';


export default function CadastroTalhoes() {
  const navigation = useNavigation();
  const [fazendas, setFazendas] = useState([]);
  const [selectedFazenda, setSelectedFazenda] = useState('');
  const [fazendaLoading, setFazendaLoading] = useState(true);
  const { idUser } = useAuth();

  const [selectedFiles, setSelectedFiles] = useState([]);

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


  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      const assets = docRes.assets;

      if (!assets) return;

      const file = assets[0];

      const newFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size
      };

      setSelectedFiles([...selectedFiles, newFile]);
    } catch (error) {
      console.log("Erro ao selecionar arquivos:", error);
    }
  };

  const removeFile = async (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);

    const updatedFormData = new FormData();
    updatedFiles.forEach((file, index) => {
      updatedFormData.append(`completeFile${index}`, JSON.stringify(file));
    });

    console.log("Updated FormData:", updatedFormData);
  };

  const buttonAvançar = async() => {
      console.log('fazenda é' + selectedFazenda)

      try{
        const formData = new FormData();
        
        if(selectedFiles.length === 0){
          Alert.alert('Aviso', 'Nenhum GEOJSON de Talhão selecionado!');
          return
        }

        if(!selectedFazenda){
          Alert.alert('Aviso', 'Nenhuma Fazenda selecionada!');
          return
        }

        selectedFiles.forEach((file, index) => {
          formData.append(`file`, {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });
        })
    

        console.log(`/talhoes/upload/${selectedFazenda}`)
        const response = await api.post(`/talhoes/upload/${selectedFazenda}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });

      } catch(erro){
        console.log('Erro ao enviar GEOJSON de Talhões: ' + erro)
      }
  
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="arrow-back" size={45} color="#F45D16" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Cadastro de Talhões</Text>
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

            <View style={styles.importar}>
              <TouchableOpacity
                  onPress={pickSomething}
                  style={styles.buttonContainer}
              >
                  <Ionicons name="add-circle-outline" size={45} color="#F45D16" />
                  <Text style={styles.InboxText}>Importar arquivo .geojson</Text>
              </TouchableOpacity>
            </View> 


            <View style={styles.scrollContainer}>
              <ScrollView style={styles.listContainer}>
                {selectedFiles.map((file, index) => (
                  <View key={index} style={styles.Arquivos}>
                    <View style={styles.secondBox}> 
                      <Ionicons name="document" size={30} color="#8DC63E" style={styles.icon} />
                      <Text style={styles.itemText}>{file.name}</Text>
                    </View>
                    <Ionicons 
                      name="trash" 
                      size={30} 
                      color="#C21111" 
                      style={styles.icon} 
                      onPress={() => removeFile(index)}
                    />
                  </View>
                ))}
              </ScrollView>
              </View>





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
  importar :{
    gap: 100,
   },
   buttonContainer: {
    width: 350,
    height: 130,
    backgroundColor: '#E2C0B0',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2, 
    borderColor: '#F45D16',
    borderStyle: 'dashed',
    gap: 13,
  },
  InboxText: {
    fontSize: 20,
    color: '#F45D16',
    fontWeight: 'bold',
  },
  scrollContainer: {
    height: 70,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10

  },
  listContainer: {
    flex: 1,
    height: 10,
    width: 350,
    paddingHorizontal: 20,
    backgroundColor: '#E4E4E4',
    borderRadius: 10, 
  },
  Arquivos: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    justifyContent: 'space-between',
   },
   secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
   },
   itemText: {
    fontSize: 16,
  },
});
