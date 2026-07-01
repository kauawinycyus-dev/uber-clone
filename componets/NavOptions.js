import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const data = [
  {
    id: "123",
    title: "Get a ride",  
    image: "https://mobile-content.uber.com/launch-experience/nava-icons-may-2026/light-mode/Sedan-160-temp.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  }
];

const NavOptions = () => {
  return (
    <FlatList
  data={data}
  horizontal
  keyExtractor={(item) => item.id}

  contentContainerStyle={{ alignItems: 'flex-start' }} 
  renderItem={({ item }) => ( 
    <TouchableOpacity 
      style={{ 
        padding: 20, 
        margin: 10, 
        backgroundColor: '#f3f4f6', 
        borderRadius: 12,
        width: 150,           // Largura travada
        alignItems: 'center', 
      }}
    >
      <View style={{ alignItems: 'center' }}> 
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{ uri: item.image }}
        />
        <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16 }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )}
/>
  )
}

export default NavOptions;