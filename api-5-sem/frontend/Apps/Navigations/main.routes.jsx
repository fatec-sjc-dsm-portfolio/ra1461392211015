import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from '../Screens/Inicio';
import ControleUser from '../Screens/ControleUser';
import Localizacao from '../Screens/Localizacao';
import Dashboard from '../Screens/Dashboard';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Login from '../Screens/Login';
import { useAuth } from '../Context/authContext';
import FazendaUnica from '../Screens/FazendaUnica';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  const { role } = useAuth();
  const { idUser } = useAuth();
  console.log(idUser);
  console.log('role+'+role)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F45D16',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#323335',
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 1,
          borderTopColor: '#F45D16',
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Início</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <TabIcon iconName="home" color={color} size={size} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Localizacao"
        component={Localizacao}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Localização</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <TabIcon iconName="location-outline" color={color} size={size} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Dash"
        component={Dashboard}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Dashboard</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <TabIcon iconName="trending-up" color={color} size={size} />
          )
        }}
      />
      {(role === 'admin') && (
        <Tab.Screen
          name="ControllerUser"
          component={ControleUser}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Usuários</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <TabIcon iconName="people" color={color} size={size} />
            )
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const tabs = [
  {
    name: 'Inicio',
    component: Inicio,
    label: 'Início',
    iconName: 'home'
  },
  {
    name: 'Localizacao',
    component: Localizacao,
    label: 'Localizacao',
    iconName: 'location-outline'
  },
  {
    name: 'Dash',
    component: Dashboard,
    label: 'Dashboard',
    iconName: 'trending-up'
  },
  {
    name: 'ControllerUser',
    component: ControleUser,
    label: 'Usuários',
    iconName: 'people'
  }
];

const TabIcon = ({ iconName, color, size, borderTopWidth }) => (
  <View style={{ alignItems: 'center', paddingTop: borderTopWidth }}>
    <View style={{ display: (iconName === 'CadastroFazenda' || iconName === 'CadastroArmadilha') ? 'none' : 'flex' }}>
      {iconName === 'home' && <FontAwesome name={iconName} size={size} color={color} />}
      {iconName === 'location-outline' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'trending-up' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'person' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'people' && <Ionicons name={iconName} size={size} color={color} />}
    </View>
  </View>
);
