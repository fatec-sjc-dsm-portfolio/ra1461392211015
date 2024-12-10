import { StyleSheet, Text, View } from 'react-native';
import TabNav from './Apps/Navigations/main.routes';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import InputFileComponent from '../frontend/Apps/Components/InputFile/InputFileComponent'
import AppNavigator from './Apps/Navigations';
import Login from './Apps/Screens/Login';
import CadastroUsuario from './Apps/Screens/CadastroUsuario';

const MyTheme = {
 ...DefaultTheme,
 colors: {
    ...DefaultTheme.colors,
    background: '#323335', 
 },
};

export default function App() {
 return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
   //  justifyContent: 'center',
 },
});
