import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import telaLogin from './pages/login'

import CPosts from './pages/CadastrarPost';
import Postagens from './pages/postagens';
import Profile from './pages/profile'
import Comentarios from './pages/Comentarios'
import CadastraComment from './pages/CadastrarComentario'
import CadastraAnswer from './pages/CadastrarAnswer'

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function TelaPost() {
  return(
    <Tab.Navigator
            initialRouteName="Feed"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12, color: "#fff" }}
            barStyle={{ backgroundColor: '#3b2fa3'}}
        >
            <Tab.Screen
                name="Feed"
                component={Postagens}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Octicons name="feed-discussion" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Publicar"
                component={CPosts}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={telaLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Post" component={TelaPost} options={{ headerShown: false }}/>
        <Stack.Screen name="Comentarios" component={Comentarios} />
        <Stack.Screen name="Cadastro" component={CadastraComment} />
        <Stack.Screen name="Answer" component={CadastraAnswer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}