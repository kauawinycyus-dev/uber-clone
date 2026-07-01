import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectViagens } from '../slices/historySlice';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const viagens = useSelector(selectViagens);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnVoltar}>⬅ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Suas Viagens</Text>
      </View>

      {viagens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.txtVazio}>Nenhuma viagem realizada ainda. 🦥</Text>
        </View>
      ) : (
        <FlatList 
          data={viagens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartaoViagem}>
              <View style={styles.linha}>
                <Text style={styles.carroText}>{item.carro} • {item.motorista}</Text>
                <Text style={styles.dataText}>{item.data}</Text>
              </View>
              <Text style={styles.destinoText}>{item.destino}</Text>
              <View style={styles.linhaBaixo}>
                <Text style={styles.estrelasText}>Avaliação: {'⭐️'.repeat(item.estrelas)}</Text>
                <Text style={styles.precoText}>
                  {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  topo: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  btnVoltar: { fontSize: 16, fontWeight: 'bold', marginRight: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtVazio: { color: '#888', fontSize: 16 },
  cartaoViagem: { padding: 15, borderBottomWidth: 1, borderColor: '#eee', marginHorizontal: 15, marginVertical: 5 },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  carroText: { fontWeight: 'bold', fontSize: 16 },
  dataText: { color: '#999', fontSize: 12 },
  destinoText: { color: '#555', marginVertical: 6, fontSize: 14 },
  linhaBaixo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  estrelasText: { fontSize: 13 },
  precoText: { fontWeight: 'bold', fontSize: 16 }
});