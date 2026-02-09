import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [cartCount, setCartCount] = useState(1);

 const similarProducts = [
   { id: 's1', name: 'Tomato', image: require('../assets/tomato.png') },
   { id: 's2', name: 'Onion', image: require('../assets/onion.png') },
   { id: 's3', name: 'Cauliflower', image: require('../assets/cauliflower.png') },
 ];


return (
  <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 220,   // space for bars
      }}
    >

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* HERO CARD */}
      <View style={styles.heroCard}>
        <Image source={product.image} style={styles.image} />
      </View>

      {/* PRODUCT INFO */}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.weight}>500g</Text>

      <Text style={styles.price}>{product.price} MRP</Text>

      <Text style={styles.detailsLink}>
        View product details ▾
      </Text>

      {/* ADD TO CART */}
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => setCartCount(cartCount + 1)}
      >
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* SIMILAR PRODUCTS */}
      <Text style={styles.similarTitle}>
        Similar products in this category
      </Text>

      <Text style={styles.similarSubTitle}>
        Frequently bought together
      </Text>

      <FlatList
        data={similarProducts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingRight: 6 }}
        renderItem={({ item }) => (
          <View style={styles.similarItem}>
            <View style={styles.similarCard}>
              <Image source={item.image} style={styles.similarImg} />
            </View>

            <Text style={styles.similarName}>
              {item.name}
            </Text>
          </View>
        )}
      />

    </ScrollView>

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
          {cartCount} item{cartCount > 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.cartArrow}>
        <Text style={{ color: '#fff', fontSize: 18 }}>➜</Text>
      </View>
    </TouchableOpacity>

    {/* ✅ Bottom product bar now inside main View */}
    <View style={styles.bottomProductBar}>
      <View>
        <Text style={styles.bottomWeight}>500 g</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.bottomPrice}>₹350 MRP</Text>

          <View style={styles.discountTag}>
            <Text style={styles.discountText}>17% OFF</Text>
          </View>
        </View>

        <Text style={styles.taxText}>Inclusive of all taxes</Text>
      </View>


      <View style={styles.qtyBox}>
        <TouchableOpacity
          onPress={() => setCartCount(Math.max(1, cartCount - 1))}
        >
          <Text style={styles.qtyBtn}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{cartCount}</Text>

        <TouchableOpacity
          onPress={() => setCartCount(cartCount + 1)}
        >
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>

  </View>
);


};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  back: {
    fontSize: 16,
    marginBottom: 10,
  },

  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    elevation: 4,
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },

  weight: {
    color: '#777',
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  detailsLink: {
    color: '#ff7a00',
    marginTop: 6,
  },

  cartBtn: {
    backgroundColor: '#ff7a00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  cartBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* Similar Products */
similarItem: {
  alignItems: 'center',
  marginRight: 20,
  width: 110,
},

similarCard: {
  width: 110,
  height: 110,
  backgroundColor: '#fff',
  borderRadius: 14,
  elevation: 3,
  justifyContent: 'center',
  alignItems: 'center',
},

similarImg: {
  width: 95,
  height: 95,
  resizeMode: 'contain',
},

similarTitle: {
  marginTop: 35,     // moves heading lower
  fontSize: 18,      // bigger text
  fontWeight: '700', // stronger bold
  marginBottom: 8,   // space before products
},




  /* Floating cart */
 cartBar: {
   position: 'absolute',
   bottom: 80,         // above product bar
   alignSelf: 'center',
   width: '50%',
   backgroundColor: '#f4c27a',
   borderRadius: 30,
   flexDirection: 'row',
   alignItems: 'center',
   padding: 12,
   elevation: 12,
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

  cartArrow: {
    backgroundColor: '#ff7a00',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

similarName: {
  marginTop: 4,
  fontSize: 15,
  textAlign: 'center',
},
similarSubTitle: {
  fontSize: 13,
  color: '#777',
  marginTop: 4,
  marginBottom: 6,
},

bottomProductBar: {
  position: 'absolute',
  bottom: 0,          // sits just above tabs automatically
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  padding: 14,
  borderTopWidth: 1,
  borderColor: '#eee',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},


bottomWeight: {
  fontWeight: 'bold',
  fontSize: 14,
},

bottomPrice: {
  fontWeight: 'bold',
  marginRight: 8,
},

discountTag: {
  backgroundColor: '#cde3ff',
  paddingHorizontal: 6,
  borderRadius: 4,
},

discountText: {
  fontSize: 10,
},

taxText: {
  fontSize: 11,
  color: '#777',
},

qtyBox: {
  flexDirection: 'row',
  backgroundColor: '#ff7a00',
  borderRadius: 10,
  alignItems: 'center',
  paddingHorizontal: 14,
  paddingVertical: 6,
},

qtyBtn: {
  color: '#fff',
  fontSize: 20,
  paddingHorizontal: 10,
},

qtyText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},

});
