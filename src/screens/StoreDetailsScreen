import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const storeProducts: any = {
  'Shyam Grocery': [
    { id: 'p1', name: 'Aashirvaad Atta', price: '₹350', image: require('../assets/atta.png') },
    { id: 'p2', name: 'Basmati Rice', price: '₹400', image: require('../assets/rice.png') },
  ],
  'Pawar’s Grocery': [
    { id: 'p3', name: 'Oil', price: '₹120', image: require('../assets/oil.png') },
    { id: 'p4', name: 'Dal', price: '₹199', image: require('../assets/dal.png') },
  ],
};

const StoreDetailsScreen = ({ route, navigation }: any) => {
  const { store } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('Atta');

  const products = storeProducts[store.name] || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.storeTitle}>{store.name}</Text>

        {/* STORE IMAGE */}
        <Image source={store.image} style={styles.mainImage} />

        {/* STORE CARD */}
        <View style={styles.storeInfoCard}>
          <Image source={store.image} style={styles.storeThumb} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{store.name}</Text>
            <Text style={{ fontSize: 12 }}>Online & In Store</Text>
          </View>
        </View>

        {/* CATEGORY FILTER */}
        <Text style={styles.sectionTitle}>
          Categories in {store.name}
        </Text>

        <View style={styles.categoryRow}>
          {['Atta', 'Rice', 'Dal'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  color: selectedCategory === cat ? '#fff' : '#000',
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PRODUCTS */}
        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
          100+ Products
        </Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImg} />
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ color: '#ff7a00', fontWeight: 'bold' }}>
                {item.price}
              </Text>

              <TouchableOpacity style={styles.addBtn}>
                <Text style={{ color: '#ff7a00', fontWeight: 'bold' }}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

      </ScrollView>
    </View>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF', padding: 16 },

  logo: { width: 60, height: 60, resizeMode: 'contain' },

  backBtn: {
    position: 'absolute',
    left: 16,
    top: 70,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  storeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },

  mainImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginVertical: 10,
  },

  storeInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginTop: 10,
    elevation: 3,
  },

  storeThumb: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 25,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },

  categoryRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  categoryBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: '#000',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginTop: 14,
    elevation: 3,
  },

  productImg: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },

  addBtn: {
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    borderRadius: 10,
    paddingVertical: 4,
    alignItems: 'center',
    marginTop: 6,
  },
});

