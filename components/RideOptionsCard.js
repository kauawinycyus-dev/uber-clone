import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Dados dos carros (Imagens oficiais do Uber para ficar profissional)
const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-Comfort-456",
    title: "Comfort",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-Black-789",
    title: "Uber Black",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// Taxa base fictícia
const VALOR_BASE_KM = 1.5;
const DISTANCIA_SIMULADA = 12.5; // Simulando uma corrida de 12km

const RideOptionsCard = ({ onConfirmar }) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo do Card */}
      <View>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
        >
          <Text style={{ fontSize: 20 }}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Selecione uma opção - {DISTANCIA_SIMULADA}km</Text>
      </View>

      {/* 🚗 Lista de Opções de Carros de Verdade */}
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={[
              styles.itemCarro,
              item.id === selected?.id && styles.itemSelecionado
            ]}
          >
            <Image 
              style={styles.fotoCarro}
              source={{ uri: item.image }}
            />
            <View style={styles.infoCarro}>
              <Text style={styles.nomeCarro}>{item.title}</Text>
              <Text>Chegada em 5 min</Text>
            </View>
            <Text style={styles.preco}>
              {new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(
                (DISTANCIA_SIMULADA * VALOR_BASE_KM * item.multiplier)
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Botão Inferior Dinâmico */}
      <View style={{ marginTop: 'auto', borderTopWidth: 1, borderColor: '#eee' }}>
        <TouchableOpacity 
          disabled={!selected} 
          onPress={() => onConfirmar(selected)} // 🟢 Dispara a animação do motorista vindo!
          style={[styles.botaoConfirmar, !selected && styles.botaoDesativado]}
        >
          <Text style={styles.textoConfirmar}>
            {selected ? `Chamar ${selected.title}` : "Selecione uma opção"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  titulo: {
    textAlign: "center",
    paddingVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  botaoVoltar: {
    position: "absolute",
    top: 12,
    left: 20,
    zIndex: 50,
  },
  itemCarro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 90,
  },
  itemSelecionado: {
    backgroundColor: "#f3f3f3",
  },
  fotoCarro: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  infoCarro: {
    flex: 1,
    marginLeft: 15,
  },
  nomeCarro: {
    fontSize: 18,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 18,
    fontWeight: "bold",
  },
  botaoConfirmar: {
    backgroundColor: "black",
    paddingVertical: 15,
    margin: 15,
    borderRadius: 5,
  },
  botaoDesativado: {
    backgroundColor: "#ccc",
  },
  textoConfirmar: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  }
});