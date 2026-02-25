import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShopsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Shops Near You</Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search store..."
            style={{ flex: 1 }}
          />
          <Text style={{ fontWeight: 'bold' }}>X</Text>
        </View>

        {/* LOVEABLE DISCOUNTS */}
        <Text style={styles.sectionTitle}>Loveable Discounts !</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.discountCard}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.discountImage}
            />
            <Text style={styles.discountText}>15 %</Text>
            <Text>Discounts</Text>
            <Text style={styles.smallText}>Pay with Google Pay</Text>
          </View>

          <View style={styles.discountCard}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.discountImage}
            />
            <Text style={styles.discountText}>10 %</Text>
            <Text>Discounts</Text>
            <Text style={styles.smallText}>Pay with Google Pay</Text>
          </View>


          <View style={styles.discountCard}>
                    <Image
                      source={require('../assets/logo.png')}
                      style={styles.discountImage}
                    />
                    <Text style={styles.discountText}>10 %</Text>
                    <Text>Discounts</Text>
                    <Text style={styles.smallText}>Pay with Google Pay</Text>
                  </View>
                </ScrollView>

        {/* STORES */}
        <Text style={styles.sectionTitle} > Shop From The Local Stores You Trust. </Text>

        {['Shyam Grocery', 'Pawar’s Grocery', 'Kamal Grocery' , 'shivam Grocery' , ' Gupta Kirana Stores' ].map(
          (store, index) => (
            <View key={index} style={styles.storeCard}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.storeImage}
              />
              <Text style={styles.storeName}>{store}</Text>

              <View style={styles.arrowBtn}>
                <Icon name="chevron-forward" size={18} color="#ff7a00" />
              </View>
            </View>
          )
        )}

      </ScrollView>
    </View>
  );
};

export default ShopsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },

  backBtn: {
    position: 'absolute',
    left: 0,
    top: 68,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom : 20,
    marginTop: 20,
  },

  discountCard: {
    width: 150,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    elevation: 2,
  },

  discountImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  smallText: {
    fontSize: 11,
    color: 'gray',
  },

  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 3,
  },

  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  storeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  arrowBtn: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff7a00',
  },
});