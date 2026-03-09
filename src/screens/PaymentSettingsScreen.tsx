import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentSettingsScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
<Image
  source={require('../assets/logo.png')}
  style={styles.logof}
/>
      {/* HEADER */}
     <View style={styles.header}>
       <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
         <Icon name="chevron-back" size={22} color="#ff7a00" />
       </TouchableOpacity>

       <Text style={styles.headerTitle}>PAYMENT SETTINGS</Text>
     </View>

      {/* CARDS */}
      <Text style={styles.section}>CARDS</Text>

      <View style={styles.card}>
        <Icon name="card-outline" size={22} color="#ff7a00" />
        <Text style={styles.cardText}>Add credit or debit cards</Text>
        <Text style={styles.plus}>+</Text>
      </View>

      {/* UPI */}
      <Text style={styles.section}>UPI</Text>

      <View style={styles.card}>
        <Image
          source={require('../assets/gpay.png')}
          style={styles.logo}
        />
        <Text style={styles.cardText}>Google Pay UPI</Text>
        <Text style={styles.plus}>+</Text>
      </View>

      {/* WALLETS */}
      <Text style={styles.section}>WALLETS</Text>

      <View style={styles.walletCard}>
        <View style={styles.walletRow}>
          <Image
            source={require('../assets/amazonpay.png')}
            style={styles.logo}
          />
          <Text style={styles.cardText}>Amazon Pay Balance</Text>
          <Text style={styles.plus}>+</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.walletRow}>
          <Image
            source={require('../assets/mobikwik.png')}
            style={styles.logo}
          />
          <Text style={styles.cardText}>Mobikwik</Text>
          <Text style={styles.plus}>+</Text>
        </View>
      </View>

      {/* NETBANKING */}
      <Text style={styles.section}>NETBANKING</Text>

      <View style={styles.card}>
        <Icon name="globe-outline" size={22} color="#ff7a00" />
        <Text style={styles.cardText}>Netbanking</Text>
        <Text style={styles.plus}>+</Text>
      </View>

    </ScrollView>
  );
};

export default PaymentSettingsScreen;

const styles = StyleSheet.create({

  logof: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginTop: 15,
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  section: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    borderWidth: 1.3,
    borderColor: '#ccc',
    marginBottom: 15,
  },

  walletCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#cfcfcf',
    marginBottom: 15,
  },

  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },

  cardText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
  },

  plus: {
    fontSize: 20,
    color: '#ff7a00',
    fontWeight: 'bold',
  },

  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});