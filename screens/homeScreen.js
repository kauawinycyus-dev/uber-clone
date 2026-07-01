import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Animated, 
  Dimensions 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; 
import * as Location from 'expo-location'; 

import { setOrigin, setDestination } from '../slices/navSlice';
import NavOptions from '../components/NavOptions';

// Configurações de Dimensão da Tela
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = 260;
const ANIMATION_DURATION = 300;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  
  // Estados Locais
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Referência de Animação para a Posição do Menu Lateral (Inicia escondido à esquerda)
  const menuPositionAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  /**
   * Controla a abertura e o fechamento do menu lateral com transição suave.
   * @param {boolean} open - Define se o menu deve abrir ou fechar.
   */
  const toggleMenu = (open) => {
    setIsMenuOpen(open);
    Animated.timing(menuPositionAnim, {
      toValue: open ? 0 : -SCREEN_WIDTH,
      duration: ANIMATION_DURATION,
      useNativeDriver: false, // Propriedade 'left' não aceita native driver
    }).start();
  };

  /**
   * Solicita permissões de hardware e busca as coordenadas atuais do GPS.
   */
  const handleGetDeviceLocation = async () => {
    setIsGpsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Ops! Precisamos da permissão do GPS para obter sua localização.');
        setIsGpsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      
      dispatch(setOrigin({
        location: { 
          lat: location.coords.latitude, 
          lng: location.coords.longitude 
        },
        description: "📍 Minha Localização Atual",
      }));
      dispatch(setDestination(null));
      
      alert('Localização obtida! Agora clique em Get a Ride.');
    } catch (error) {
      alert('Erro ao tentar acessar o hardware do GPS.');
      console.error(error);
    } finally {
      setIsGpsLoading(false);
    }
  };

  /**
   * Define o ponto de partida do mapa baseado em um local favoritado.
   * @param {Object} place - Objeto contendo dados geográficos do endereço.
   */
  const handleSelectSavedPlace = (place) => {
    dispatch(setOrigin({ 
      location: { lat: place.lat, lng: place.lng }, 
      description: place.endereco 
    }));
    dispatch(setDestination(null));
  };

  // Base de Dados Simulada de Destinos Frequentes
  const savedPlaces = [
    { id: "1", icon: "🏠", title: "Casa", endereco: "Avenida Paulista, 1000", lat: -23.561684, lng: -46.655981 },
    { id: "2", icon: "💼", title: "Trabalho", endereco: "Faria Lima, 3500", lat: -23.589531, lng: -46.686629 },
  ];

  /* ==========================================
     COMPONENTES INTERNOS (RENDER HELPERS)
     ========================================== */

  const renderHeader = () => (
    <View style={styles.cabecalho}>
      <TouchableOpacity style={styles.botaoMenu} onPress={() => toggleMenu(true)}>
        <Text style={styles.iconeHamburguer}>☰</Text>
      </TouchableOpacity>

      <Image 
        style={styles.logo}
        source={{ uri: 'https://www.edigitalagency.com.au/wp-content/uploads/new-Uber-logo-black-png-small-size.png' }} 
      />
      <View style={styles.headerSpacer} />
    </View>
  );

  const renderSavedPlacesList = () => (
    <View style={styles.listaLocais}>
      {savedPlaces.map((place) => (
        <TouchableOpacity 
          key={place.id} 
          style={styles.cartaoLocal}
          onPress={() => handleSelectSavedPlace(place)}
        >
          <Text style={styles.emojiLocal}>{place.icon}</Text>
          <View>
            <Text style={styles.nomeLocal}>{place.title}</Text>
            <Text style={styles.enderecoLocal}>{place.endereco}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCustomDrawer = () => (
    <>
      {isMenuOpen && (
        <TouchableOpacity 
          style={styles.fundoFosco} 
          activeOpacity={1} 
          onPress={() => toggleMenu(false)} 
        />
      )}

      <Animated.View style={[styles.menuLateral, { left: menuPositionAnim }]}>
        <View style={styles.topoMenuLateral}>
          <Text style={styles.txtOla}>Olá, Usuário 👋</Text>
          <TouchableOpacity onPress={() => toggleMenu(false)}>
            <Text style={styles.txtFechar}>✕</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.itemMenu} onPress={() => toggleMenu(false)}>
          <Text style={styles.txtItemMenu}>🏠 Início</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.itemMenu} 
          onPress={() => { 
            toggleMenu(false); 
            navigation.navigate("HistoryScreen"); 
          }}
        >
          <Text style={styles.txtItemMenu}>📜 Histórico de Viagens</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        
        {renderHeader()}

        <Text style={styles.tituloSecao}>Para onde vamos hoje?</Text>

        <TouchableOpacity 
          style={styles.botaoGps} 
          onPress={handleGetDeviceLocation} 
          disabled={isGpsLoading}
        >
          {isGpsLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.textoGps}>🎯 Usar Localização Atual (GPS)</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Ou selecione um destino salvo:</Text>
        
        {renderSavedPlacesList()}

        <NavOptions />
      </View>

      {renderCustomDrawer()}
    </View>
  );
};

export default HomeScreen;

/* ==========================================
   ESTILOS VISUAIS (STYLESHEET)
   ========================================== */
const styles = StyleSheet.create({
  mainWrapper: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },
  container: { 
    padding: 20, 
    paddingTop: 50, 
    flex: 1 
  },
  cabecalho: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  botaoMenu: { 
    padding: 10, 
    marginLeft: -10 
  },
  iconeHamburguer: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#000000' 
  },
  logo: { 
    width: 100, 
    height: 40, 
    resizeMode: 'contain' 
  },
  headerSpacer: { 
    width: 40 
  },
  tituloSecao: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  subtitulo: { 
    fontSize: 14, 
    color: '#666666', 
    marginBottom: 10, 
    fontWeight: '500' 
  },
  botaoGps: { 
    backgroundColor: '#000000', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 25 
  },
  textoGps: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  listaLocais: { 
    marginBottom: 25 
  },
  cartaoLocal: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    backgroundColor: '#f8f8f8', 
    borderRadius: 8, 
    marginBottom: 10 
  },
  emojiLocal: { 
    fontSize: 22, 
    marginRight: 15 
  },
  nomeLocal: { 
    fontWeight: '600', 
    fontSize: 15 
  },
  enderecoLocal: { 
    color: '#666666', 
    fontSize: 12 
  },

  // Estilos da Gaveta Customizada (Drawer Manual)
  fundoFosco: { 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    zIndex: 99 
  },
  menuLateral: { 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    width: MENU_WIDTH, 
    backgroundColor: '#ffffff', 
    padding: 20, 
    paddingTop: 60, 
    zIndex: 100,
    // Efeito de Sombra Multiplataforma (iOS e Web/Android compatível)
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  topoMenuLateral: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 40, 
    borderBottomWidth: 1, 
    borderColor: '#eeeeee', 
    paddingBottom: 20 
  },
  txtOla: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  txtFechar: { 
    fontSize: 22, 
    color: '#888888', 
    padding: 5 
  },
  itemMenu: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderColor: '#f4f4f4' 
  },
  txtItemMenu: { 
    fontSize: 16, 
    fontWeight: '500' 
  }
});