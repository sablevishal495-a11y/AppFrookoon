import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
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
    { id: 'p1', name: 'Aashirvaad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p2', name: 'Basmati Rice', price: '₹400', category: 'Rice', image: require('../assets/rice.png') },
    { id: 'p7', name: 'Toor Dal', price: '₹199', category: 'Dal', image: require('../assets/dal.png') },
    { id: 'p8', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p9', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p11', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },


  ],
  'Kamal Grocery': [
    { id: 'p3', name: 'Ashirwad Atta', price: '₹320', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p4', name: 'Toor Dal', price: '₹199', category: 'Dal', image: require('../assets/dal.png') },
    { id: 'p5', name: 'India Gate Rice', price: '₹280', category: 'Rice', image: require('../assets/rice.png') },
  ],

   "Pawar's Grocery": [
    { id: 'p1', name: 'Aashirvaad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p2', name: 'Basmati Rice', price: '₹400', category: 'Rice', image: require('../assets/rice.png') },
    { id: 'p7', name: 'Toor Dal', price: '₹199', category: 'Dal', image: require('../assets/dal.png') },
    { id: 'p8', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p9', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },
    { id: 'p11', name: 'Ashirwad Atta', price: '₹350', category: 'Atta', image: require('../assets/atta.png') },


  ],
};

const StoreDetailsScreen = ({ route, navigation }: any) => {
  const { store } = route.params;
const categories = ['Atta', 'Rice', 'Dal'];
const [selectedCategory, setSelectedCategory] = useState(categories[0]);
const { cartItems, addToCart } = useCart();
  const allProducts = storeProducts[store.name] || [];

  const filteredProducts = allProducts.filter(
    (item: any) => item.category === selectedCategory
  );

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
         data={filteredProducts}
         keyExtractor={(item) => item.id}
         numColumns={2}
         scrollEnabled={false}
         columnWrapperStyle={{ justifyContent: 'space-between' }}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.productCard}
             onPress={() =>
               navigation.navigate('ProductDetails', { product: item })
             }
             activeOpacity={0.8}
           >
             <Image source={item.image} style={styles.productImg} />

             <Text style={{ fontWeight: '600' }}>{item.name}</Text>

             <Text style={{ color: '#ff7a00', fontWeight: 'bold' }}>
               {item.price}
             </Text>

             <TouchableOpacity
               style={styles.addBtn}
               onPress={(e) => {
                 e.stopPropagation(); // 🔥 VERY IMPORTANT
                 addToCart({
                   ...item,
                   quantity: 1,
                 });
               }}
             >
               <Text style={{ color: '#ff7a00', fontWeight: 'bold' }}>
                 ADD
               </Text>
             </TouchableOpacity>
           </TouchableOpacity>
         )}
       />

      </ScrollView>

      {/* FLOATING CART */}
      {cartItems.length > 0 && (
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
              {cartItems.length} item
              {cartItems.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.cartBtn}>
            <Text style={{ color: '#fff', fontSize: 18 }}>➜</Text>
          </View>
        </TouchableOpacity>
      )}

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
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginTop: 14,
    elevation: 3,
  },

  productImg: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },

  addBtn: {
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    borderRadius: 10,
    paddingVertical: 4,
    alignItems: 'center',
    marginTop: 10,
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
});

