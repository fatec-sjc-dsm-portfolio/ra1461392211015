import * as JWT from 'expo-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJWTDecoded = async () => {
  const jwt_key = 'c3028da8-f7ca-411b-832f-d06e3080c5e0';
  const token = await AsyncStorage.getItem('Token');


    const token_decodificado = await JWT.decode(token, jwt_key);
    console.log('teste: '+ token_decodificado)
  
};
