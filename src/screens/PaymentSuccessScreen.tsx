import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Icon name="checkmark" size={48} color="#fff" />
      </View>

      <Text style={styles.title}>Payment Success</Text>
      <Text style={styles.subtitle}>
        Your payment is successful{'\n'}
        Transaction ID : XXXXXXXXXX
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.outlineText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filledBtn}>
          <Text style={styles.filledText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: '#ff8c00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  outlineText: {
    color: '#000',
    fontWeight: '600',
  },

  filledBtn: {
    backgroundColor: '#ff8c00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  filledText: {
    color: '#fff',
    fontWeight: '600',
  },
});
