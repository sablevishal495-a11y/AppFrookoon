import React from 'react';
import { useRoute } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
const { totalAmount } = route.params as { totalAmount: number };

  const deliveryFee = 20;
  const discount = 30;

  const finalTotal = totalAmount + deliveryFee - discount;


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- LOGO ---------- */}
        <View style={styles.logoWrapper}>
          <Logo size={42} />
        </View>

        {/* ---------- BACK + TITLE ---------- */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Checkout</Text>
        </View>

        {/* ---------- DELIVERY TIME ---------- */}
        <View style={styles.deliveryPill}>
          <Text style={styles.deliveryText}>Delivery in 15 Min</Text>
        </View>

        {/* ---------- DELIVERY ADDRESS ---------- */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <Text style={styles.editText}>EDIT</Text>
          </View>

          <Text style={styles.addressText}>
            123 MG ROAD,{'\n'}BANGALURU, KA 560001
          </Text>
        </View>

        {/* ---------- ORDER SUMMARY ---------- */}
       <View style={styles.card}>
         <Text style={styles.cardTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text>Sub total</Text>
          <Text>{totalAmount} Rs.</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Delivery fee</Text>
          <Text>{deliveryFee} Rs.</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Discount</Text>
          <Text style={{ color: 'red' }}>- {discount} Rs.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{finalTotal} Rs.</Text>
        </View>

       </View>


        {/* ---------- PAYMENT METHOD ---------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          <View style={styles.paymentRow}>
            <Text>VISA •••• 9934</Text>
            <Icon name="radio-button-on" size={18} color="#ff8c00" />
          </View>

          <View style={styles.paymentRow}>
            <Text>Apple Pay</Text>
            <Icon name="radio-button-on" size={18} color="#aaa" />
          </View>

          <View style={styles.paymentRow}>
            <Text>Paypal</Text>
            <Icon name="radio-button-on" size={18} color="#aaa" />
          </View>

          <Text style={styles.addPayment}>Add +</Text>
        </View>
      </ScrollView>

      {/* ---------- PAYMENT BUTTON ---------- */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => {
          // simulate successful payment
          navigation.navigate('PaymentSuccess');
        }}
      >
        <Text style={styles.payText}>PAYMENT</Text>
      </TouchableOpacity>


    </View>
  );
};

export default CheckoutScreen;

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  logoWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },

  deliveryPill: {
    backgroundColor: '#e9fbe9',
    borderColor: '#3cb371',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },

  deliveryText: {
    color: '#2e8b57',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 16,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  editText: {
    color: '#ff8c00',
    fontWeight: '600',
  },

  addressText: {
    color: '#666',
    lineHeight: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },

  totalLabel: {
    fontWeight: '700',
  },

  totalAmount: {
    fontWeight: '700',
    color: '#ff8c00',
  },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  addPayment: {
    marginTop: 8,
    color: '#ff8c00',
    fontWeight: '600',
    textAlign: 'right',
  },

  payButton: {
    backgroundColor: '#ff8c00',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },

  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
