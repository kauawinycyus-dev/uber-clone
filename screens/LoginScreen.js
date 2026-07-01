import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Constantes de Configuração Visuai
const UBER_LOGO_URL = 'https://www.edigitalagency.com.au/wp-content/uploads/new-Uber-logo-black-png-small-size.png';
const PLACEHOLDER_COLOR = '#999999';

const LoginScreen = () => {
  const navigation = useNavigation();
  
  // Estados de Controle do Formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Processa a validação dos campos e efetua o redirecionamento.
   */
  const handleLoginSubmit = () => {
    const isFormInvalid = !email.trim() || !password.trim();

    if (isFormInvalid) {
      alert('Por favor, preencha todos os campos! 🧐');
      return;
    }
    
    // Substitui a rota atual na pilha para impedir o retorno à tela de login
    navigation.replace("HomeScreen"); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.conteudo}>
        
        <Image 
          style={styles.logo}
          source={{ uri: UBER_LOGO_URL }} 
        />

        <Text style={styles.boasVindas}>Insira seu e-mail e senha</Text>

        {/* Input de E-mail */}
        <TextInput 
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor={PLACEHOLDER_COLOR}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        {/* Input de Senha */}
        <TextInput 
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor={PLACEHOLDER_COLOR}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        {/* Ação de Envio */}
        <TouchableOpacity 
          style={styles.botaoEntrar} 
          onPress={handleLoginSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Avançar ➡️</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

/* ==========================================
   ESTILOS VISUAIS (STYLESHEET)
   ========================================== */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },
  conteudo: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 25 
  },
  logo: { 
    width: 130, 
    height: 50, 
    resizeMode: 'contain', 
    marginBottom: 40 
  },
  boasVindas: { 
    fontSize: 20, 
    fontWeight: '500', 
    color: '#333333', 
    marginBottom: 20 
  },
  input: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e3e3e3'
  },
  botaoEntrar: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});