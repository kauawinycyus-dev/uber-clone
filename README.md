
<table>
  <tr>
    <td><img width="1170" height="2532" alt="IMG_6971" src="https://github.com/user-attachments/assets/3de4121f-25b6-4bd5-b0bb-53567d55e49c" /></td>
    <td><img width="1170" height="2532" alt="IMG_6970" src="https://github.com/user-attachments/assets/3d859617-33fe-4a52-9071-f73cc41ef480" /></td>
    <td><img width="1170" height="2532" alt="IMG_6969" src="https://github.com/user-attachments/assets/34484f3e-a62c-4ca1-8dc6-35ef8b286e85" /></td>
    <td><img width="1170" height="2532" alt="IMG_6968" src="https://github.com/user-attachments/assets/4413110d-fc4a-4f12-9bb5-20e0c07bac82" /></td>
    <td><img width="1170" height="2532" alt="IMG_6972" src="https://github.com/user-attachments/assets/8d598aa6-ec3c-4ec1-a89a-1201062a1d04" /></td>
  </tr>
</table>

# 🚗 Uber Clone - React Native

Uma réplica funcional e simplificada do aplicativo Uber, desenvolvida em **React Native** com **Expo**. O projeto engloba desde o controle de acesso com uma tela de login minimalista até o gerenciamento de estados globais para histórico de viagens e simulações de corrida no mapa.

---

## 📱 Demonstração do Aplicativo

Abaixo você pode conferir as principais telas desenvolvidas no projeto, exibidas lado a lado:

<table>
  <tr>
    <td align="center"><b>🔐 Tela de Login</b></td>
    <td align="center"><b>🏠 Tela Inicial (Home)</b></td>
    <td align="center"><b>🗺️ Mapa & Corrida</b></td>
  </tr>
  <tr>
    <td><img src="URL_DO_PRINT_LOGIN" width="220" alt="Tela de Login" /></td>
    <td><img src="URL_DO_PRINT_HOME" width="220" alt="Tela Inicial" /></td>
    <td><img src="URL_DO_PRINT_MAPA" width="220" alt="Mapa e Corrida" /></td>
  </tr>
</table>

> 💡 *Dica: Substitua `URL_DO_PRINT_...` pelos links das imagens hospedadas ou caminhos relativos do seu repositório após fazer o upload dos prints.*

---

## 🚀 Funcionalidades Principais

* **Autenticação Simulada:** Tela de login no padrão visual do Uber com validação de campos nativa.
* **Geolocalização Integrada:** Permissão e captura de coordenadas em tempo real através do hardware de GPS do dispositivo (`expo-location`).
* **Menu Lateral Animado (Custom Drawer):** Menu hambúrguer fluído desenvolvido do zero utilizando o motor de animações nativo (`Animated`), evitando dependências instáveis de runtime.
* **Simulação de Corrida:** Motoristas parceiros renderizados no mapa que se movem fisicamente calculando a distância até o usuário.
* **Chat com IA:** Canal de mensagens integrado com o motorista simulado.
* **Fluxo de Avaliação:** Cartão pós-corrida interativo com sistema de estrelas.
* **Histórico de Viagens:** Estado global persistido utilizando **Redux Toolkit** para listar todas as corridas concluídas.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes ferramentas e bibliotecas:

* **[React Native](https://reactnative.dev/)** & **[Expo Go](https://expo.dev/)** - Core e ambiente de desenvolvimento mobile.
* **[React Navigation Stack](https://reactnavigation.org/)** - Gerenciamento de rotas e fluxo de pilhas.
* **[Redux Toolkit](https://redux-toolkit.js.org/)** - Arquitetura de estado global centralizada.
* **[React Native Maps](https://github.com/react-native-maps/react-native-maps)** - Renderização de mapas e marcadores (Markers).

---

## 📦 Como Executar o Projeto

Siga os passos abaixo para rodar o aplicativo localmente em seu ambiente de desenvolvimento.

### Pré-requisitos
* Node.js instalado.
* Expo Go instalado no seu dispositivo móvel (iOS ou Android).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/Winycyus/uber-clone.git](https://github.com/Winycyus/uber-clone.git)
   cd uber-clone
