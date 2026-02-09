import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const categories = [
  { id: '1', title: 'Atta', image: require('../assets/atta.png') },
  { id: '2', title: 'Rice', image: require('../assets/rice.png') },
  { id: '3', title: 'Dal', image: require('../assets/dal.png') },
  { id: '4', title: 'Rawa & Maida', image: require('../assets/dal.png') },
  { id: '5', title: 'Spices', image: require('../assets/spices.png') },
  { id: '6', title: 'Oil', image: require('../assets/oil.png') },
  { id: '7', title: 'Snacks', image: require('../assets/snacks.png') },
  { id: '8', title: 'Fruits', image: require('../assets/fruits.png') },
  { id: '9', title: 'Vegetables', image: require('../assets/vegetables.png') },
  { id: '10', title: 'Dairy', image: require('../assets/dairy.png') },
];

const catalog = {
  Atta: [
    { id: '1', name: 'Ashirvad Atta', price: '₹350', image: require('../assets/atta.png') },
    { id: '2', name: 'Ashirvad Atta', price: '₹450', image: require('../assets/atta2.png') },
    { id: '3', name: 'Ashirvad Atta', price: '₹550', image: require('../assets/atta.png') },
    { id: '4', name: 'Ashirvad Atta', price: '₹650', image: require('../assets/atta2.png') },
    { id: '5', name: 'Ashirvad Atta', price: '₹750', image: require('../assets/atta.png') },
    { id: '6', name: 'Ashirvad Atta', price: '₹850', image: require('../assets/atta2.png') },
  ],

  Rice: [
    { id: '2', name: 'Rice Bag', price: '₹80', image: require('../assets/cat2.png') },
  ],

  Dal: [
    { id: '3', name: 'Dal Pack', price: '₹60', image: require('../assets/cat3.png') },
  ],
};

const CategoriesScreen = () => {
  const [selectedCat, setSelectedCat] = useState('Atta');
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Shop by Categories</Text>
          <Text style={styles.deliveryText}>
            Delivering to: Bajnamath Chowk
          </Text>
        </View>

        <Text style={{ fontSize: 20 }}>🔍</Text>
      </View>

      {/* FILTER ROW */}
      <View style={styles.filterRow}>
        <Text style={styles.filterBtn}>Filters</Text>
        <Text style={styles.filterBtn}>Sort</Text>
        <Text style={styles.filterBtn}>Prices</Text>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.container}>
        {/* LEFT MENU */}
        <View style={styles.leftMenu}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row' }}>
                {selectedCat === item.title && (
                  <View style={styles.activeBar} />
                )}

                <TouchableOpacity
                  style={[
                    styles.catItem,
                    selectedCat === item.title && styles.activeCat,
                  ]}
                  onPress={() => setSelectedCat(item.title)}
                >
                  <Image source={item.image} style={styles.catImg} />
                  <Text style={styles.catText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* RIGHT PRODUCTS */}
        <View style={styles.rightSide}>
          <FlatList
            data={catalog[selectedCat]}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 8,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product: item })
                }
              >
                <View style={styles.imageWrap}>
                  <Image source={item.image} style={styles.productImg} />
                </View>

                <View style={styles.nameRow}>
                  <TouchableOpacity
                    style={styles.addBtnOverlay}
                   onPress={() => addToCart(item)}

                  >
                    <Text style={{ color: '#ff7a00', fontWeight: 'bold' }}>
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>

                <Text style={styles.ratingText}>
                  ⭐⭐⭐⭐⭐ (3,859)
                </Text>

                <Text style={styles.deliveryTime}>🟢 11 MINS</Text>

                <Text style={styles.stockText}>Only 1 left</Text>

                <Text style={styles.priceText}>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* FLOATING CART */}
      <TouchableOpacity
        style={styles.cartBar}
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.9}
      >
        <Image
          source={require('../assets/cart.png')}
          style={styles.cartImg}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.cartTitle}>View cart</Text>
          <Text style={styles.cartSub}>
            {cart.length} item{cart.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.cartBtn}>
          <Text style={{ color: '#fff', fontSize: 18 }}>➜</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesScreen;



const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },

  backBtn: {
    fontSize: 22,
    marginRight: 10,
  },

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  deliveryText: {
    color: '#ff7a00',
    fontSize: 12,
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },

 filterBtn: {
   backgroundColor: '#f5f5f5',
   paddingVertical: 8,
   paddingHorizontal: 14,
   borderRadius: 10,
   marginRight: 8,
   elevation: 1,
 },


  leftMenu: {
    width: 85,
    backgroundColor: '#f9f9f9',
    paddingTop: 6,
  },

  catItem: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeCat: {
    backgroundColor: '#fff',
  },

catImg: {
  width: 50,
  height: 50,
  resizeMode: 'contain',
  borderRadius: 23,
  backgroundColor: '#fff',
  padding: 6,
},


  catText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    width: 70,
  },

  rightSide: {
    flex: 1,
    padding: 10,
  },

productCard: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 10,
  marginBottom: 14,
  elevation: 3,
},

  productImg: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },

  imageWrap: {
    alignItems: 'center',
  },

 addBtnOverlay: {
   borderWidth: 1,
   borderColor: '#ff7a00',
   borderRadius: 8,
   paddingVertical: 6,
   paddingHorizontal: 16,
   marginTop: -16,
   backgroundColor: '#fff',
   elevation: 2,
 },



  ratingText: {
    fontSize: 12,
    marginTop: 6,
  },

  deliveryTime: {
    fontSize: 12,
    color: 'green',
  },

  stockText: {
    fontSize: 12,
    color: 'red',
  },

  priceText: {
    fontWeight: 'bold',
    marginTop: 2,
  },
productName: {
  fontWeight: '600',
  marginTop: 6,
  fontSize: 13,
},
nameRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end', // push button right
  marginTop: 6,
},


addBtnRight: {
  borderWidth: 1,
  borderColor: '#ff7a00',
  borderRadius: 8,
  paddingVertical: 5,
  paddingHorizontal: 12,
},

cartBar: {
  position: 'absolute',
  bottom: 60,
  alignSelf: 'center',
  width: '50%',
  backgroundColor: '#f4c27a',
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  elevation: 10,
},



cartImg: {
  width: 36,
  height: 36,
  borderRadius: 18,
  marginRight: 10,
},

cartTitle: {
  fontWeight: 'bold',
},

cartSub: {
  fontSize: 12,
},

cartBtn: {
  backgroundColor: '#ff7a00',
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
},
activeBar: {
  width: 4,
  backgroundColor: '#ff7a00',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
},


});
