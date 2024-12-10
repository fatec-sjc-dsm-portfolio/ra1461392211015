import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../Context/authContext';

export default function CardTotal({title, number, subTitle, type}) {
    const navigation = useNavigation();
    const {role} = useAuth();
    const cor = type == 'fazenda' ? '#8DC63E' :  type == 'talhoes' ? '#8DC63E' : '#A66B3A';
    const handlePress = () => {
        type == 'armadilha'
        ? navigation.navigate('CadastroArmadilhas')
        : navigation.navigate('CadastroFazendas')
        
    };
    const dynamicStyle = {
        numberText: {
            color: cor,
            fontSize: 40,
            fontWeight: 'bold',
         },
         subTitleText: {
            color: cor,
            fontSize: 16,
            fontWeight: 'bold',
         },
         button: {
            backgroundColor: cor,
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
         },
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.boxText}>{title}</Text>
                <View style={styles.primaryBox}>
                    <View style={styles.secondaryBox}>
                        <Text style={dynamicStyle.numberText}>{number}</Text>
                        <Text style={dynamicStyle.subTitleText}>{subTitle}</Text>
                    </View>
                    {role == 'admin' ? 
                    <TouchableOpacity 
                        onPress={handlePress} 
                        style={styles.buttonContainer}
                    >
                        <View style={dynamicStyle.button}>
                            <Ionicons name="add" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    : null
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
 container: {
    width: 185,
    height: 185,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    padding: 10, 
 },
 primaryBox: {
    flex: 1, 
    alignItems: 'center',
    flexDirection: 'row',
 },
 secondaryBox: {
    width: 110,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
 },
 boxText: {
    color: '#323335', 
    fontSize: 24,
    fontWeight: 'bold', 
 },
 buttonContainer: { 
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 },
});
