import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VoucherScreen = ({ navigation }: any) => {

  const [voucherCode, setVoucherCode] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const isVoucherValid = voucherCode.length === 16;
  const isPinValid = pin.length === 6;

  const isFormValid = isVoucherValid && isPinValid;

  const handleClaimVoucher = async () => {
    if (!isFormValid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Voucher Claimed Successfully 🎉");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={22} color="#ff7a00" />
        </TouchableOpacity>

        <Text style={styles.title}>Voucher</Text>
      </View>

      {/* Voucher Input */}
      <Text style={styles.subtitle}>
        Enter 16 digit code and 6 digit pin to claim your voucher
      </Text>

     <TextInput
       placeholder="Enter voucher code"
       style={styles.input}
       keyboardType="number-pad"
       maxLength={16}
       value={voucherCode}
       onChangeText={setVoucherCode}
     />

     {voucherCode.length > 0 && voucherCode.length < 16 && (
       <Text style={styles.errorText}>Voucher must be 16 digits</Text>
     )}

   <TextInput
     placeholder="Enter pin"
     style={styles.input}
     keyboardType="number-pad"
     maxLength={6}
     value={pin}
     onChangeText={setPin}
   />

   {pin.length > 0 && pin.length < 6 && (
     <Text style={styles.errorText}>PIN must be 6 digits</Text>
   )}
      <TouchableOpacity
        style={[
          styles.claimButton,
          !isFormValid && { opacity: 0.5 }
        ]}
        disabled={!isFormValid || loading}
        onPress={handleClaimVoucher}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.claimButtonText}>Claim Voucher</Text>
        )}
      </TouchableOpacity>


      {/* Gift Cards */}
      <Text style={styles.sectionTitle}>E-Gift cards</Text>

      <Text style={styles.sectionSub}>
        Send a quick & thoughtful gift easily
      </Text>

      <View style={styles.cardRow}>
        <Image
          source={require('../assets/birthday.png')}
          style={styles.cardImage}
        />

        <Image
          source={require('../assets/wedding.png')}
          style={styles.cardImage}
        />
      </View>

    </ScrollView>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
  },

  logo: {
    width: 55,
    height: 55,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: '#444',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
  },

  sectionSub: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardImage: {
    width: '50%',
    height: 180,
    borderRadius: 14,
  },
claimButton: {
  backgroundColor: '#FF6B00',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 15,
  elevation: 2,
},

claimButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

errorText: {
  color: '#ff3b30',
  fontSize: 13,
  marginBottom: 10,
  marginLeft: 5,
}

});