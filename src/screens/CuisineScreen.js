import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContextController } from '../store';

const cuisines = [
  { id: '1', name: 'Chinese', image: require('../assets/chinese.png') },
  { id: '2', name: 'South Indian', image: require('../assets/south-indian.png') },
  { id: '3', name: 'Beverages', image: require('../assets/beverages.png') },
  { id: '4', name: 'North Indian', image: require('../assets/north-indian.png') },
];

const CuisineScreen = ({ navigation }) => {
  const { dispatch } = useMyContextController();

  useEffect(() => {
    dispatch({ type: 'SET_CATEGORIES', payload: cuisines });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Menu', { category: item.name })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuisine</Text>
      <FlatList
        data={cuisines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#FF6B00',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
    color: '#FF6B00',
  },
});

export default CuisineScreen; 