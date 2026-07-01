import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/homeScreen'; 

export default function App() {
  return (
    <Provider store={store}> 
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});