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

  const stores = [
    {
      id: 's1',
      name: 'Shyam Grocery',
      image: require('../assets/shop.png.png'),
    },
    {
      id: 's2',
      name: 'Pawar’s Grocery',
      image: require('../assets/shop0.png.png'),
    },
    {
      id: 's3',
      name: 'Kamal Grocery',
      image: require('../assets/shop2.png.png'),
    },
    {
      id: 's4',
      name: 'Shivam Grocery',
      image: require('../assets/shop.png.png'),
    },
    {
      id: 's5',
      name: 'Gupta Kirana Stores',
      image: require('../assets/shop.png.png'),
    },
  ];

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
              source={require('../assets/shop0.png.png')}
              style={styles.discountImage}
            />
            <Text style={styles.discountText}>15 %</Text>
            <Text>Discounts</Text>
            <Text style={styles.smallText}>Pay with Google Pay</Text>
          </View>

          <View style={styles.discountCard}>
            <Image
              source={require('../assets/atta.png')}
              style={styles.discountImage}
            />
            <Text style={styles.discountText}>10 %</Text>
            <Text>Discounts</Text>
            <Text style={styles.smallText}>On Purchasing Atta From Any Store</Text>
          </View>


          <View style={styles.discountCard}>
                    <Image
                      source={require('../assets/oil.png')}
                      style={styles.discountImage}
                    />
                    <Text style={styles.discountText}>10 %</Text>
                    <Text>Discounts</Text>
                    <Text style={styles.smallText}>On Purchasing Oil From Any Store </Text>
                  </View>
                </ScrollView>

        {/* STORES */}
        <Text style={styles.sectionTitle}>
          Shop From The Local Stores You Trust.
        </Text>

        {stores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeCard}
            activeOpacity={0.8}
          >
            <Image source={store.image} style={styles.storeImage} />
            <Text style={styles.storeName}>{store.name}</Text>

            <View style={styles.arrowBtn}>
              <Icon name="chevron-forward" size={18} color="#ff7a00" />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

export default ShopsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
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
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1.5,
    borderColor: '#D9D9D9',
  },

sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 25,
  marginBottom: 12,
},
  discountCard: {
    width: 150,
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
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
   backgroundColor: '#F8F8F8',
   padding: 16,
   borderRadius: 18,
   marginBottom: 16,
   borderWidth: 1,
   borderColor: '#DADADA',
   shadowColor: '#000',
   shadowOpacity: 0.05,
   shadowRadius: 4,
   shadowOffset: { width: 0, height: 2 },
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF7A00',
  },
});