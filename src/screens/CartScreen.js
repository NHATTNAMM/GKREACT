import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContextController } from '../store';

const CartScreen = ({ navigation }) => {
  const { state, dispatch } = useMyContextController();
  const { cart } = state;

  useEffect(() => {
    navigation.setOptions({ headerRight: undefined });
  }, [navigation]);

  // Tính tổng tiền các món
  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const offerDiscount = -18; // Giảm giá cố định
  const tax = Math.round(itemsTotal * 0.08 * 100) / 100; // 8% thuế, làm tròn 2 số
  const delivery = 30; // Phí giao hàng cố định
  const totalPay = Math.round((itemsTotal + offerDiscount + tax + delivery) * 100) / 100;

  const increase = (id) => dispatch({ type: 'INCREASE_CART_ITEM', payload: id });
  const decrease = (id) => dispatch({ type: 'DECREASE_CART_ITEM', payload: id });
  const remove = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigation.navigate('PaymentSuccess', { total: totalPay });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => decrease(item.id)}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => increase(item.id)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.price}>  ₹{item.price * item.quantity}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => remove(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.billBox}>
            <Text style={styles.billTitle}>Bill Receipt</Text>
            <View style={styles.billRow}><Text>Items Total</Text><Text>{itemsTotal} ₹</Text></View>
            <View style={styles.billRow}><Text>Offer Discount</Text><Text>{offerDiscount} ₹</Text></View>
            <View style={styles.billRow}><Text>Taxes (8%)</Text><Text>{tax} ₹</Text></View>
            <View style={styles.billRow}><Text>Delivery Charges</Text><Text>{delivery} ₹</Text></View>
            <View style={styles.billRow}><Text style={{ fontWeight: 'bold' }}>Total Pay</Text><Text style={{ fontWeight: 'bold' }}>{totalPay} ₹</Text></View>
          </View>
          <View style={styles.footerRow}>
            <View style={styles.payBox}><Text style={styles.payText}>₹ {totalPay}</Text></View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed To Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 18,
    color: '#FF6B00',
    fontWeight: 'bold',
    minWidth: 24,
    textAlign: 'center',
  },
  billBox: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  billTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  payBox: {
    backgroundColor: '#fff0e6',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  payText: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 2,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  backButtonTop: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FF6B00',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  backButtonText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen; 