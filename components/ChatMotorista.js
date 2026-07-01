import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

const ChatMotorista = ({ nomeMotorista }) => {
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá! Já estou a caminho.', remetente: 'motorista' },
    { id: '2', texto: 'Ok, estou de casaco azul na frente do prédio.', remetente: 'passageiro' },
  ]);
  const [inputTexto, setInputTexto] = useState('');

  const enviarMensagem = () => {
  if (inputTexto.trim() === '') return;

  // 🟢 Criando a variável com o nome correto em português
  const novaMensagem = {
    id: Math.random().toString(),
    texto: inputTexto,
    remetente: 'passageiro',
  };

  // 🟢 Corrigido de novaMessage para novaMensagem
  setMensagens((prev) => [...prev, novaMensagem]);
  setInputTexto('');

  // Simulação: Motorista responde 2 segundos depois
  setTimeout(() => {
    const respostaMotorista = {
      id: Math.random().toString(),
      texto: 'Combinado! Chego em instantes.',
      remetente: 'motorista',
    };
    setMensagens((prev) => [...prev, respostaMotorista]);
  }, 2000);
};
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.topoChat}>
        <Text style={styles.nomeMotorista}>Mensagem para {nomeMotorista} 💬</Text>
      </View>

      {/* Lista de Balões */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.balao,
            item.remetente === 'passageiro' ? styles.balaoPassageiro : styles.balaoMotorista
          ]}>
            <Text style={item.remetente === 'passageiro' ? styles.textoBranco : styles.textoPreto}>
              {item.texto}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Campo de Input */}
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Enviar mensagem..."
          value={inputTexto}
          onChangeText={setInputTexto}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMotorista;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  topoChat: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  nomeMotorista: { fontWeight: 'bold', fontSize: 16 },
  balao: { padding: 12, borderRadius: 15, marginHorizontal: 15, marginVertical: 5, maxWidth: '75%' },
  balaoMotorista: { backgroundColor: '#eee', alignSelf: 'flex-start' },
  balaoPassageiro: { backgroundColor: '#000', alignSelf: 'flex-end' },
  textoBranco: { color: 'white' },
  textoPreto: { color: 'black' },
  containerInput: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center', backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f000', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: '#eee', marginRight: 10 },
  botaoEnviar: { backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  textoBotao: { color: '#fff', fontWeight: 'bold' }
});