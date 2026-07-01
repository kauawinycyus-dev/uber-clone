import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adicionarViagem } from '../slices/historySlice';

const AvaliacaoCard = ({ carro, motorista, destino, onFinalizar }) => {
  const dispatch = useDispatch();
  const [estrelas, setEstrelas] = useState(5); // Começa com 5 estrelas por padrão

  const confirmarAvaliacao = () => {
    // Salva a viagem no Redux antes de fechar
    dispatch(adicionarViagem({
      id: Math.random().toString(),
      motorista: motorista,
      carro: carro.title,
      destino: destino || "Destino Simulado",
      preco: (12.5 * 1.5 * carro.multiplier), // Preço que calculamos antes
      estrelas: estrelas,
      data: new Date().toLocaleDateString('pt-BR'),
    }));

    // Avisa a tela principal para resetar
    onFinalizar();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Corrida Finalizada! 🏁</Text>
      <Text style={styles.subtitulo}>Como foi sua viagem com o {motorista}?</Text>

      <Image source={{ uri: carro.image }} style={styles.fotoCarro} />

      {/* ⭐️ Fileira de Estrelas Interativas */}
      <View style={styles.containerEstrelas}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setEstrelas(num)}>
            <Text style={[styles.estrela, num <= estrelas ? styles.estrelaAtiva : styles.estrelaInativa]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.textoEstrelas}>{estrelas} de 5 estrelas</Text>

      <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarAvaliacao}>
        <Text style={styles.textoBotao}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvaliacaoCard;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  subtitulo: { fontSize: 15, color: '#666', marginBottom: 15, textAlign: 'center' },
  fotoCarro: { width: 90, height: 90, resizeMode: 'contain' },
  containerEstrelas: { flexDirection: 'row', marginVertical: 15 },
  estrela: { fontSize: 42, marginHorizontal: 5 },
  estrelaAtiva: { color: '#FFD700' }, // Dourado
  estrelaInativa: { color: '#CCC' }, // Cinza
  textoEstrelas: { fontSize: 16, fontWeight: '600', marginBottom: 20 },
  botaoConfirmar: { backgroundColor: 'black', width: '100%', padding: 15, borderRadius: 5 },
  textoBotao: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});