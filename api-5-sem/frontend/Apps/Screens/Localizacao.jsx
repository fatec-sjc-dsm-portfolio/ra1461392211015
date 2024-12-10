import MapaComponent from "../Components/Mapa/MapaComponent";
import { useRoute } from '@react-navigation/native';
import { Text, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/core';



export default function Localizacao() {
    const navigation = useNavigation();


    const route = useRoute()
    const { idFazenda, nomeFazenda } = route.params;

    // logica pra buscar os dados das fazendas, talhoes, e armadilhas para ter as coordanas e informacoes

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Ionicons name="arrow-back" size={45} color="#F45D16" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>{nomeFazenda}</Text>
            </View>

    
            <View style={styles.mapContainer}>
                <MapaComponent idFazenda={idFazenda}/>
            </View>
        </View>
    
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 50,
        backgroundColor: '#323335',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingBottom: 20,
      },
      mainTitle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
      },
      mapContainer: {
        flex: 1,
        width: '100%',
    }
});
