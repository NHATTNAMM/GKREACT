import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentSuccessScreen = ({ route, navigation }) => {
  const { total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.message}>Thank you for your order</Text>
      <Text style={styles.amount}>Total Amount: ${total}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  amount: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentSuccessScreen; 