
import React, { useState } from 'react';

import { useRoute } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
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

const [selectedPayment, setSelectedPayment] = useState('visa');
const [showExtraMethods, setShowExtraMethods] = useState(false);

const defaultMethods = [
  { key: 'visa', label: 'VISA •••• 9934' },
      { key: 'apple', label: 'Apple Pay' },
          { key: 'paypal', label: 'Paypal' },
];

const extraMethods = [
  { key: 'upi', label: 'UPI' },
  { key: 'gpay', label: 'Google Pay' },
  { key: 'bharatpe', label: 'BharatPe' },
];


  const finalTotal = totalAmount + deliveryFee - discount;
 const [address, setAddress] = useState(
          '123 MG ROAD,\nBANGALURU, KA 560001'
        );

        const [isEditingAddress, setIsEditingAddress] = useState(false);

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
           <TouchableOpacity onPress={() => setIsEditingAddress(true)}>
             <Text style={styles.editText}>EDIT</Text>
           </TouchableOpacity>

          </View>

          {isEditingAddress ? (
            <>
              <TextInput
                style={styles.input}
                multiline
                value={address}
                onChangeText={setAddress}
              />
              <TouchableOpacity
                onPress={() => setIsEditingAddress(false)}
                style={styles.saveBtn}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.addressText}>{address}</Text>
          )}

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
          <Text style={styles.totalLabel}>Total </Text>
          <Text style={styles.totalAmount}>{finalTotal} Rs.</Text>
        </View>

       </View>


        {/* ---------- PAYMENT METHOD ---------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          {/* Default Methods */}
          {defaultMethods.map(method => (
            <TouchableOpacity
              key={method.key}
              style={styles.paymentRow}
              onPress={() => setSelectedPayment(method.key)}
            >
              <Text>{method.label}</Text>

              <Icon
                name={
                  selectedPayment === method.key
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={18}
                color={
                  selectedPayment === method.key ? '#ff8c00' : '#aaa'
                }
              />
            </TouchableOpacity>
          ))}

          {/* Extra Methods (only show if Add+ clicked) */}
          {showExtraMethods &&
            extraMethods.map(method => (
              <TouchableOpacity
                key={method.key}
                style={styles.paymentRow}
                onPress={() => setSelectedPayment(method.key)}
              >
                <Text>{method.label}</Text>

                <Icon
                  name={
                    selectedPayment === method.key
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={18}
                  color={
                    selectedPayment === method.key ? '#ff8c00' : '#aaa'
                  }
                />
              </TouchableOpacity>
            ))}

          {/* Add Button */}
          {!showExtraMethods && (
            <TouchableOpacity
              onPress={() => setShowExtraMethods(true)}
            >
              <Text style={styles.addPayment}>Add +</Text>
            </TouchableOpacity>
          )}
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

input: {
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 10,
  marginTop: 8,
  borderWidth: 1,
  borderColor: '#ddd',
},

saveBtn: {
  backgroundColor: '#ff8c00',
  marginTop: 10,
  padding: 8,
  borderRadius: 8,
  alignItems: 'center',
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
