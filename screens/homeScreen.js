import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import NavOptions from '../componets/NavOptions';

const homeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={{
          
          uri: 'https://www.edigitalagency.com.au/wp-content/uploads/new-Uber-logo-black-png-small-size.png' 
        }} 
      />
      <Text style={styles.text}>A HomeScreen finalmente apareceu!</Text>
      <NavOptions />
    </View>
  )
}

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    marginTop: 10,
  },
});