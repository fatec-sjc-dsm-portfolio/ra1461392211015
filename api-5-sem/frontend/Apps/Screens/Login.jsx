import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import LogoAgro from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Services/Axios';
import { useAuth } from '../Context/authContext';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { getUserByEmail, setIdUser , setRole} = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { 
        "email": email,
        "password": senha
      });

      const { accessToken } = response.data;
      await AsyncStorage.setItem('Token', accessToken);

      const user = await getUserByEmail(email);
      setIdUser(user.id_usuario);
      setRole(user.role);

      
      api.interceptors.request.use(async config => {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
          config.headers.Authorization = `Bearer ${token} `;
        }
        return config;
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }], 
      });
    } catch (error) {
      
      Alert.alert('Erro', 'Usuário ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoAgro} style={styles.image} />
      <Text style={styles.textTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323335',
    padding: 20,
  },
  image: {
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 30,
    color: '#8DC63E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8DC63E',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  loginButton: {
    backgroundColor: '#F45D16',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
