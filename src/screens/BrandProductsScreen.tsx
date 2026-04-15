import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const products = [
  {
    id: '1',
    brand: 'Aashirvaad',
    name: 'Aashirvaad Select 100% MP Sharbati Atta',
    price: 325,
    mrp: 378,
    image: require('../assets/atta.png'),
  },
  {
    id: '2',
    brand: 'Aashirvaad',
    name: 'Aashirvaad Select 100% MP Sharbati Atta',
    price: 325,
    mrp: 378,
    image: require('../assets/atta.png'),
  },
  {
    id: '3',
    brand: 'Aashirvaad',
    name: 'Aashirvaad Select 100% MP Sharbati Atta',
    price: 325,
    mrp: 378,
    image: require('../assets/atta.png'),
  },
{
    id: '4',
    brand: 'Aashirvaad',
    name: 'Aashirvaad Select 100% MP Sharbati Atta',
    price: 325,
    mrp: 378,
    image: require('../assets/atta.png'),
    },
  {
      id: '5',
      brand: 'Aashirvaad',
      name: 'Aashirvaad Select 100% MP Sharbati Atta',
      price: 325,
      mrp: 378,
      image: require('../assets/atta.png'),
      },
  {
      id: '6',
      brand: 'Aashirvaad',
      name: 'Aashirvaad Select 100% MP Sharbati Atta',
      price: 325,
      mrp: 378,
      image: require('../assets/atta.png'),
      },
  {
      id: '7',
      brand: 'Aashirvaad',
      name: 'Aashirvaad Select 100% MP Sharbati Atta',
      price: 325,
      mrp: 378,
      image: require('../assets/atta.png'),
      },
  {
      id: '8',
      brand: 'Aashirvaad',
      name: 'Aashirvaad Select 100% MP Sharbati Atta',
      price: 325,
      mrp: 378,
      image: require('../assets/atta.png'),
      },

];

const BrandProductsScreen = ({ route, navigation }) => {
  const { brand } = route.params;

  const filteredProducts = products.filter(
    (item) => item.brand === brand
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'<'}</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.brandTitle}>{brand}</Text>
          <Text style={styles.delivery}>
            Delivering to Home - 123 MG ROAD
          </Text>
        </View>
      </View>

      {/* FILTER ROW */}
      <View style={styles.filterRow}>
       <View style={styles.filterBtn}>
         <Text style={styles.filterText}>Filters</Text>
       </View>
        <Text style={styles.filter}>Sort</Text>
        <Text style={styles.filter}>Atta Type</Text>
        <Text style={styles.filter}>Type</Text>
      </View>

      {/* PRODUCT GRID */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imgBox}>
              <Image source={item.image} style={styles.img} />
            </View>

            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>

           <View style={{ marginTop: 4 }}>
             <Text style={styles.mrp}>₹{item.mrp}</Text>
             <Text style={styles.price}>₹{item.price}</Text>
             <Text style={styles.perKg}>65 Rs./Kg</Text>
           </View>

            <TouchableOpacity style={styles.addBtn}>
              <Text style={{ color: '#FF6B00', fontSize: 18 }}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default BrandProductsScreen;

const styles = StyleSheet.create({
header: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 14,
  backgroundColor: '#fff',
  gap: 10,
},
  back: { fontSize: 22 },

  brandTitle: { fontSize: 18, fontWeight: '800' },
  delivery: { fontSize: 12, color: '#FF6B00',marginTop:2, },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  filter: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 6,
  },

 card: {
   width: '48%',
   backgroundColor: '#fff',
   borderRadius: 14,
   padding: 10,
   marginBottom: 14,
   elevation: 3,
   shadowColor: '#000',
   shadowOpacity: 0.08,
   shadowRadius: 6,
   shadowOffset: { width: 0, height: 2 },
 },

  img: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },

  name: {
    fontSize: 12,
    marginTop: 6,
  },

  mrp: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 11,
  },

  price: {
    color: '#FF6B00',
    fontWeight: '700',
    fontSize: 14,
  },

addBtn: {
  position: 'absolute',
  bottom: 10,
  right: 10,
  width: 32,
  height: 32,
  borderRadius: 8,
  borderWidth: 1.5,
  borderColor: '#FF6B00',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},
imgBox: {
  width: '100%',
  height: 120,
  backgroundColor: '#F7F7F7',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 8,
},

img: {
  width: '80%',
  height: '80%',
  resizeMode: 'contain',
},
mrp: {
  textDecorationLine: 'line-through',
  color: '#999',
  fontSize: 11,
},

price: {
  color: '#FF6B00',
  fontWeight: '800',
  fontSize: 15,
},

perKg: {
  fontSize: 11,
  color: '#888',
  marginTop: 2,
},

filterRow: {
  flexDirection: 'row',
  gap: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
},

filterBtn: {
  backgroundColor: '#F1F1F1',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 10,
},

filterText: {
  fontSize: 13,
  color: '#333',
  fontWeight: '500',
},

});