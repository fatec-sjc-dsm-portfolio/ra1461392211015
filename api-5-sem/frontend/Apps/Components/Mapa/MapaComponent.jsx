  import React, { useEffect, useState, useRef } from 'react';
  import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
  import MapView, { Marker, Polygon } from 'react-native-maps';
  import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
  import icon_location2 from '../../../assets/icon_location2.png';
  import api from '../../Services/Axios';
  import { format } from 'date-fns';


  const LegendItem = ({ color, text, icon }) => {
    return (
      <View style={styles.legendItem}>
        <Image source={icon} style={{ width: 28, height: 28, tintColor: color }} />
        <Text style={styles.legendText}>{text}</Text>
      </View>
    );
  };

  const MapaComponent = ({ idFazenda }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [layout, setLayout] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrap, setSelectedTrap] = useState(null);
    const [mapReady, setMapReady] = useState(false);
    const mapRef = useRef(null);
    const modalMapRef = useRef(null)
    const locationWatcher = useRef(null);

    const [fazendaIsLoading, setFazendaIsLoading] = useState(true)
    const [talhoesIsLoading, setTalhoesIsLoading] = useState(true)
    const [armadilhasIsLoading, setArmadilhasIsLoading] = useState(true)
    const [fazendaCoordenadas, setFazendaCoordenadas] = useState([])
    const [talhoesCoordenadas, setTalhoesCoordenadas] = useState([])
    const [armadilhasCoordenadas, setArmadilhasCoordenadas] = useState([])

    const[modalLoading, setModalLoading] = useState(true)
    const [totalPragas, setTotalPragas] = useState()
    const [dataUltimaCaptura, setDataUltimaCaptura] = useState()


    const [idTalhoes, setIdTalhoes] = useState([])


    async function requestLocationPermission() {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentLocation = await getCurrentPositionAsync();
        setUserLocation(currentLocation);
      }
    }

    useEffect(() => {
      requestLocationPermission();
    }, []);

    useEffect(() => {
      if (mapReady) {
        const startWatching = async () => {
          locationWatcher.current = await watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 10000,
            distanceInterval: 1
          }, (response) => {
            setUserLocation(response);
            if (mapRef.current && typeof mapRef.current.animateCamera === 'function') {
              mapRef.current.animateCamera({
                center: fazendaCoordenadas[0]
              });
            }
          });
        };
        startWatching();
      }

      return () => {
        if (locationWatcher.current && typeof locationWatcher.current.remove === 'function') {
          locationWatcher.current.remove();
        }
      };
    }, [mapReady]);

    const onLayout = (event) => {
      const { width, height } = event.nativeEvent.layout;
      if (width > 0 && height > 0) {
        setLayout({ width, height });
      }
    };

    const openModal = async(trap, idTrap) => {
      console.log('abriu modal da amrmadilha: '+idTrap)
      setSelectedTrap(trap);
 
      try{
        const response = await api.get(`dados-armadilhas/findByLatest/${idTrap}`);
        const data = response.data.data_coleta
        const data_formatada = format(new Date(data), 'dd/MM/yyyy')
        setDataUltimaCaptura(data_formatada)
        setTotalPragas(response.data.quantidade)
      
        setModalLoading(false)
        setModalVisible(true);
  
  
        if (modalMapRef.current && trap) {
          modalMapRef.current.animateCamera({
            center: {
              latitude: trap.latitude,
              longitude: trap.longitude,
            },
          });
        }
      } catch(err) {
        Alert.alert('Aviso', 'Nenhuma Imagem foi Cadastrada nessa Armadilha!');
      }
  
    }



// buscando as fazendas
    useEffect(() => {
      const fetchFazendasCoordenadas = async () => {
        try {
          const response_fazenda = await api.get(`fazendas-coordenadas/${idFazenda}`);

          const coordenadas_fazenda = response_fazenda.data.map(coordenada => ({
            latitude: coordenada.latitude,
            longitude: coordenada.longitude
          }));
          setFazendaCoordenadas(coordenadas_fazenda);



        
        } catch (err) {
          console.log('Erro ao buscar coordenadas: ' + err);
        } finally {
          setFazendaIsLoading(false)
        }
      };

      fetchFazendasCoordenadas();
    }, []);


    useEffect(() => {
      const getAllTalhoesID = async () => {
        try {
          const response = await api.get(`talhoes/findByIdFazenda/${idFazenda}`);
          const talhoes = response.data;
          const ids = talhoes.map(talhao => talhao.id_talhao);
          setIdTalhoes(ids);
        } catch (err) {
          console.log('Erro ao buscar IDs de talhões: ' + err);
        }
      };
  
      getAllTalhoesID();
    }, []);


    useEffect(() => {
      const getAllCoordsTalhoes = async () => {
        try {
          const allCoords = [];
          const allArmadilhas = [];
          for (const id of idTalhoes) {
            const responseTalhao = await api.get(`talhoes-coordenadas/${id}`);
            const coordenadas_talhao = responseTalhao.data.map(coordenada => ({
              latitude: coordenada.latitude,
              longitude: coordenada.longitude
            }));
            allCoords.push(coordenadas_talhao);
  
            const responseArmadilhas = await api.get(`armadilhas/findByIdTalhao/${id}`);
            const armadilhas = responseArmadilhas.data.map(armadilha => ({
              latitude: armadilha.longitude,
              longitude: armadilha.latitude
            }));
            allArmadilhas.push(...armadilhas);
            
          }
          setTalhoesCoordenadas(allCoords);
          setArmadilhasCoordenadas(allArmadilhas);
        } catch (err) {
          console.log('Erro ao buscar coordenadas de talhões ou armadilhas: ' + err);
        } finally {
          setTalhoesIsLoading(false);
          setArmadilhasIsLoading(false);
        }
      };
  
      if (idTalhoes.length > 0) {
        getAllCoordsTalhoes();
      }
    }, [idTalhoes]);



    return (
      <View style={styles.container} onLayout={onLayout}>
        {fazendaIsLoading ? (
          <Text>Carregando</Text>
        ) : (
          <>
        {layout && userLocation &&(
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
              }}
              onMapReady={() => setMapReady(true)}
            >
              <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                centerOffset={{ x: 0, y: -50 }}
              >
                <Image 
                  source={icon_location2} 
                  style={{ width: 80, height: 80 }}
                  tintColor={'#5CE1E6'}
                />
              </Marker>

              {armadilhasIsLoading ? (
                <View></View>
              ):(
                <>
                  {armadilhasCoordenadas.map((coordenada, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: coordenada.latitude,
                      longitude: coordenada.longitude,
                    }}
                    onPress={() => openModal(coordenada, index)}
                  />
                ))}
                </>
              )}
         

       
              <Polygon
                coordinates={fazendaCoordenadas}
                fillColor="#9BCF53"
                strokeColor="rgba(0, 0, 0, 0.5)"
                strokeWidth={1}
              />

            {talhoesIsLoading ? ( 
                  <View></View>
                  ):(
                    <>
                    {talhoesCoordenadas.map((coords, index) => (
                      <Polygon
                        key={index}
                        coordinates={coords}
                        fillColor="#FFF67E"
                        strokeColor="rgba(0, 0, 0, 0.5)"
                        strokeWidth={1}
                        />
                    ))}
                    </>
                  )}
            

            </MapView>
          </View>
            
        )}
        </>
      )}
      
      
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
          <ScrollView contentContainerStyle={styles.modalScrollViewContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalhes da armadilha</Text>
              {selectedTrap && (
               <MapView
               ref={modalMapRef}
               style={styles.map}
               initialRegion={{
                 latitude: selectedTrap.latitude,
                 longitude: selectedTrap.longitude,
                 latitudeDelta: 0.001,
                 longitudeDelta: 0.001
               }}
               scrollEnabled={false}
               zoomEnabled={false}
               rotateEnabled={false}
             >
               <Marker
                 coordinate={{
                   latitude: userLocation.coords.latitude,
                   longitude: userLocation.coords.longitude,
                 }}
                 anchor={{ x: 0.5, y: 0.5 }}
                 centerOffset={{ x: 0, y: -50 }}
               >
                 <Image 
                   source={icon_location2} 
                   style={{ width: 80, height: 80 }}
                   tintColor={'#5CE1E6'}
                 />
               </Marker>
 
               {armadilhasIsLoading ? (
                 <View></View>
               ):(
                 <>
                   {armadilhasCoordenadas.map((coordenada, index) => (
                   <Marker
                     key={index}
                     coordinate={{
                       latitude: coordenada.latitude,
                       longitude: coordenada.longitude,
                     }}
                     onPress={() => openModal(coordenada)}
                   />
                 ))}
                 </>
               )}
          
 
        
               <Polygon
                 coordinates={fazendaCoordenadas}
                 fillColor="#9BCF53"
                 strokeColor="rgba(0, 0, 0, 0.5)"
                 strokeWidth={1}
               />
 
             {talhoesIsLoading ? ( 
                   <View></View>
                   ):(
                     <>
                     {talhoesCoordenadas.map((coords, index) => (
                       <Polygon
                         key={index}
                         coordinates={coords}
                         fillColor="#FFF67E"
                         strokeColor="rgba(0, 0, 0, 0.5)"
                         strokeWidth={1}
                         />
                     ))}
                     </>
                   )}
             
 
             </MapView>
              )}
              <Text style={styles.textStyle}>Última captura: {dataUltimaCaptura}</Text>
              <Text style={styles.textStyle}>Número de pragas Capturadas: {totalPragas}</Text>
              <TouchableOpacity style={styles.registerButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.registerButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <View style={styles.legendContainer}>
          <LegendItem color="#9BCF53" text="Fazendas" icon={require('../../../assets/icon_location2.png')} />
          <LegendItem color="#FFF67E" text="Talhões" icon={require('../../../assets/icon_location2.png')} />
          <LegendItem color="red" text="Armadilhas" icon={require('../../../assets/icon_location2.png')} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '95%',
    },
    map: {
      flex: 1,
      width: '100%',
      maxHeight: '95%',
    },
    modalScrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#323335",
      color: "#fff",
    },
    modalContent: {
      width: '90%',
      height: '90%',
      backgroundColor: '#323335',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalMap: {
      width: '100%',
      height: 200,
      marginBottom: 20,
    },
    textStyle: {
      color: '#fff',
      fontSize: 17
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: "#fff",
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
    legendContainer: {
      backgroundColor: '#323335',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      paddingBottom: 20,
    },
    legendText: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });

  export default MapaComponent;
