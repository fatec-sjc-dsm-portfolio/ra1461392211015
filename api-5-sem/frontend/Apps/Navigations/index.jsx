import React from 'react';
import Inicio from '../Screens/Inicio';
import TabNav from './main.routes';
import CadastroFazenda from '../Screens/CadastroFazenda';
import { createStackNavigator } from '@react-navigation/stack';
import InputFileComponent from '../Components/InputFile/InputFileComponent';
import CameraComponent from '../Components/Camera/CameraComponent';
import InfoFazenda from '../Screens/InfoFazenda';
import ControleUser from '../Screens/ControleUser';
import Login from '../Screens/Login';
import { AuthProvider } from '../Context/authContext';
import CadastroUsuario from '../Screens/CadastroUsuario';
import SelectFazendaTalhaoArmadilhas from '../Screens/SelectFazendaTalhaoArmadilhas';
import Localizacao from '../Screens/Localizacao';
import FazendaUnica from '../Screens/FazendaUnica';
import CadastroTalhoes from '../Screens/CadastroTalhoes';
import CadastroArmadilha from '../Screens/CadastroArmadilha';



export default function AppNavigator() {
    const Stack = createStackNavigator();

    return (
        
        <AuthProvider>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="Camera" component={CameraComponent} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroFazendas" component={InputFileComponent} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroArmadilhas" component={SelectFazendaTalhaoArmadilhas} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }} />
            <Stack.Screen name="Localizacao" component={Localizacao} options={{ headerShown: false }} />
            <Stack.Screen name="FazendaUnica" component={FazendaUnica} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroTalhoes" component={CadastroTalhoes} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroArmadilhaSelectTalhao" component={CadastroArmadilha} options={{ headerShown: false }} />
        </Stack.Navigator>
        </AuthProvider>
    );
}