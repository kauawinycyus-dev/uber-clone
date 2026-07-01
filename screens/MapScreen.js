import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { selectOrigin } from '../slices/navSlice';
import RideOptionsCard from '../components/RideOptionsCard';
import ChatMotorista from '../components/ChatMotorista';
import AvaliacaoCard from '../components/AvaliacaoCard';

// Configurações Geográficas de Fábrica (Fallback)
const SÃO_PAULO_COORDS = {
  latitude: -23.561684,
  longitude: -46.655981,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

const ARRIVAL_THRESHOLD = 0.0002; // Proximidade mínima para considerar desembarque
const SIMULATION_STEP_RATIO = 0.2; // Velocidade de aproximação (20% a cada ciclo)
const REFRESH_RATE_MS = 1500;

/**
 * Utilitário puro para gerar a área de visualização do mapa.
 */
const getRegionCoordinates = (origin) => {
  if (!origin?.location) return SÃO_PAULO_COORDS;
  return {
    latitude: origin.location.lat,
    longitude: origin.location.lng,
    latitudeDelta: 0.012,
    longitudeDelta: 0.012,
  };
};

const MapScreen = () => {
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  
  // Estados de Controle de Viagem e Atores
  const [motoristas, setMotoristas] = useState([]);
  const [statusViagem, setStatusViagem] = useState('selecionando'); 
  const [carroEscolhido, setCarroEscolhido] = useState(null);

  const mapRegion = getRegionCoordinates(origin);

  // Efeito 1: Inicialização geográfica dos motoristas próximos
  useEffect(() => {
    if (!mapRegion.latitude) return;

    setMotoristas([
      { id: 'mot-1', nome: 'Carlos', latitude: mapRegion.latitude + 0.003, longitude: mapRegion.longitude + 0.002 },
      { id: 'mot-2', nome: 'Ana', latitude: mapRegion.latitude - 0.002, longitude: mapRegion.longitude + 0.004 },
    ]);
  }, [origin]);

  // Efeito 2: Sistema de simulação física de aproximação do veículo
  useEffect(() => {
    const isVehicleEnRoute = statusViagem === 'a_caminho' && origin;
    if (!isVehicleEnRoute) return;

    const simulationInterval = setInterval(() => {
      setMotoristas((currentDrivers) => 
        currentDrivers.map((driver) => {
          if (driver.id !== 'mot-1') return driver;

          const distanceLat = mapRegion.latitude - driver.latitude;
          const distanceLng = mapRegion.longitude - driver.longitude;
          const hasArrived = Math.abs(distanceLat) < ARRIVAL_THRESHOLD && Math.abs(distanceLng) < ARRIVAL_THRESHOLD;

          if (hasArrived) {
            clearInterval(simulationInterval);
            setStatusViagem('chegou');
            Alert.alert("🚗 Seu carro chegou!", `${driver.nome} está aguardando no local.`);
            return { ...driver, latitude: mapRegion.latitude, longitude: mapRegion.longitude };
          }

          return {
            ...driver,
            latitude: driver.latitude + distanceLat * SIMULATION_STEP_RATIO,
            longitude: driver.longitude + distanceLng * SIMULATION_STEP_RATIO,
          };
        })
      );
    }, REFRESH_RATE_MS);

    return () => clearInterval(simulationInterval);
  }, [statusViagem]);

  /**
   * Modifica os estados para inicializar o fluxo de busca de motoristas.
   */
  const handleStartRide = (vehicle) => {
    setCarroEscolhido(vehicle);
    setStatusViagem('procurando');

    setTimeout(() => {
      setStatusViagem('a_caminho');
    }, 2000);
  };

  /* ==========================================
     COMPONENTES INTERNOS (RENDER HELPERS)
     ========================================== */

  const renderMapMarkers = () => (
    <>
      {origin && (
        <Marker 
          coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
          title="Você"
          pinColor="blue"
        />
      )}

      {motoristas.map((driver) => (
        <Marker
          key={driver.id}
          coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
          title={driver.nome}
        >
          <View style={styles.marcadorCarro}>
            <Text style={styles.emojiCarro}>
              {driver.id === 'mot-1' && statusViagem === 'a_caminho' ? '⚡🚗' : '🚗'}
            </Text>
          </View>
        </Marker>
      ))}
    </>
  );

  const renderDetailsPanel = () => {
    switch (statusViagem) {
      case 'selecionando':
        return <RideOptionsCard onConfirmar={handleStartRide} />;
      
      case 'procurando':
        return (
          <View style={styles.centralizado}>
            <Text style={styles.textoStatus}>Procurando motoristas parceiros... 🔍</Text>
          </View>
        );
      
      case 'a_caminho':
        return <ChatMotorista nomeMotorista="Carlos" />;
      
      case 'chegou':
        return (
          <AvaliacaoCard 
            carro={carroEscolhido}
            motorista="Carlos"
            destino={origin?.description}
            onFinalizar={() => {
              setStatusViagem('selecionando');
              navigation.navigate("HomeScreen");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.textoVoltar}>⬅</Text>
      </TouchableOpacity>

      <View style={styles.metadeMapa}>
        <MapView 
          style={styles.mapa} 
          initialRegion={mapRegion} 
          region={mapRegion}
        >
          {renderMapMarkers()}
        </MapView>
      </View>

      <View style={styles.metadeDetalhes}>
        {renderDetailsPanel()}
      </View>

    </View>
  );
};

export default MapScreen;

/* ==========================================
   ESTILOS VISUAIS (STYLESHEET)
   ========================================== */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },
  botaoVoltar: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: 'white', 
    zIndex: 100, 
    padding: 10, 
    borderRadius: 50, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoVoltar: { 
    fontSize: 20 
  },
  metadeMapa: { 
    flex: 1 
  },
  mapa: { 
    flex: 1 
  },
  metadeDetalhes: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  marcadorCarro: { 
    backgroundColor: 'white', 
    padding: 5, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#cccccc' 
  },
  emojiCarro: { 
    fontSize: 20 
  },
  centralizado: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  textoStatus: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  }
});