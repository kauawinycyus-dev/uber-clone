import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

// Gerenciamento de Estado Global
import { store } from './store'; 

// Telas do Aplicativo (Componentes de Fluxo)
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import HistoryScreen from './screens/HistoryScreen';

// Inicialização do navegador em formato de pilha (Stack)
const Stack = createStackNavigator();

/**
 * Componente Raiz do Aplicativo.
 * Responsável por injetar o estado do Redux e gerenciar a árvore de navegação principal.
 */
export default function App() {
  return (
    <Provider store={store}>
      {/* Container que gerencia o histórico e o estado de navegação das telas */}
      <NavigationContainer>
        
        {/* Navigator configurado para ocultar as barras de topo padrões (header) */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* A primeira Screen definida dita o ponto de entrada do App.
            O usuário inicia obrigatoriamente pela tela de Login.
          */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          
          {/* Fluxo de telas após autenticação */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          
        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  );
}