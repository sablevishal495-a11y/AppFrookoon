import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
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

  const { cartItems, addToCart, increaseQty } = useCart();
  const cartItem = cartItems.find(i => i.id === product.id);
  const [qty, setQty] = useState(1);

  const similarProducts = [
    { id: 's1', name: 'Tomato', price: '35' , image: require('../assets/tomato.png') },
    { id: 's2', name: 'Onion', price: '35' ,image: require('../assets/onion.png') },
    { id: 's3', name: 'Cauliflower',price: '35' , image: require('../assets/cauliflower.png') },
    { id: 's4', name: 'Atta',price: '35' , image: require('../assets/atta.png') },

  ];

const moreProducts = [
  { id: 'm1', name: 'Rice', price: '₹950', image: require('../assets/rice.png') },
  { id: 'm2', name: 'Dal', price: '₹130', image: require('../assets/dal.png') },
  { id: 'm3', name: 'Atta', price: '₹380', image: require('../assets/atta.png') },
  { id: 'm4', name: 'Atta', price: '₹350', image: require('../assets/atta2.png') },
];

  return (
    <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 260 }}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.menuDots}>≡</Text>
        </View>

        {/* HERO IMAGE */}
        <View style={styles.heroWrapper}>
          <Image source={product.image} style={styles.heroImage} />
        </View>

        {/* PRODUCT INFO ROW */}
        <View style={styles.productRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {product.name.toUpperCase()}
            </Text>

            <Text style={styles.weight}>500g</Text>

            <Text style={styles.price}>
              {product.price} <Text style={styles.mrp}>MRP</Text>
            </Text>

            <Text style={styles.detailsLink}>
              View product details ▾
            </Text>
          </View>

          <TouchableOpacity
            style={styles.smallAddBtn}
            onPress={() =>
              addToCart({
                ...product,
                quantity: 1,
              })
            }
          >
            <Text style={styles.smallAddText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

     {/* SIMILAR PRODUCTS */}
     <Text style={styles.similarTitle}>
       Top products in this category
     </Text>

     <Text style={styles.similarSubTitle}>
       Frequently bought together
     </Text>

     <FlatList
       data={similarProducts}
       keyExtractor={(item) => item.id}
       horizontal
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={{ paddingTop: 12 }}
       renderItem={({ item }) => (
         <TouchableOpacity
           style={styles.similarItem}
           activeOpacity={0.8}
           onPress={() =>
             navigation.push('ProductDetails', { product: item })
           }
         >
           <View style={styles.similarCard}>
             <Image source={item.image} style={styles.similarImg} />
           </View>
           <Text style={styles.similarName}>{item.name}</Text>
         </TouchableOpacity>
       )}
     />

     {/* MORE PRODUCTS SECTION */}
     <Text style={styles.moreTitle}>
       More products you may like
     </Text>

     <FlatList
       data={moreProducts}
       keyExtractor={(item) => item.id}
       numColumns={2}
       scrollEnabled={false}
       columnWrapperStyle={{ justifyContent: 'space-between' }}
       renderItem={({ item }) => (
         <TouchableOpacity
           style={styles.moreCard}
           onPress={() =>
             navigation.push('ProductDetails', { product: item })
           }
         >
           <Image source={item.image} style={styles.moreImg} />
           <Text style={styles.moreName}>{item.name}</Text>
           <Text style={styles.morePrice}>{item.price}</Text>
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
             {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
           </Text>
         </View>

         <View style={styles.cartArrow}>
           <Text style={{ color: '#fff', fontSize: 18 }}>➜</Text>
         </View>
       </TouchableOpacity>
     )}

      {/* BOTTOM QTY BAR */}
      <View style={styles.bottomProductBar}>
        <View>
          <Text style={styles.bottomWeight}>500g</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.bottomPrice}>{product.price} MRP</Text>

            <View style={styles.discountTag}>
              <Text style={styles.discountText}>17% OFF</Text>
            </View>
          </View>

          <Text style={styles.taxText}>Inclusive of all taxes</Text>
        </View>

        <View style={styles.qtyBox}>
          <TouchableOpacity onPress={() => setQty(q => Math.max(1, q - 1))}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity
            onPress={() => {
              if (cartItem) {
                increaseQty(product.id);
              } else {
                addToCart({ ...product, quantity: 1 });
              }
            }}
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


heroWrapper: {
  borderRadius: 22,
  overflow: 'hidden',
  elevation: 5,
  marginBottom: 16,
},
heroImage: {
  width: '100%',
  height: 260,
  resizeMode: 'cover',
},
productRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 25,
},

title: {
  fontSize: 18,
  fontWeight: '700',
  color: '#444',
},

smallAddText: {
  color: '#fff',
  fontWeight: '600',
},

smallAddBtn: {
  backgroundColor: '#ff7a00',
  paddingVertical: 12,
  paddingHorizontal: 18,
  borderRadius: 12,
  marginTop: 50,
},

 cartBtn: {
   backgroundColor: '#ff7a00',
   paddingVertical: 18,
   borderRadius: 16,
   alignItems: 'center',
   marginTop: 25,
 },

 cartBtnText: {
   color: '#fff',
   fontWeight: '600',
   fontSize: 16,
 },

  similarTitle: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: '700',
  },

similarSubTitle: {
  fontSize: 16,
  color: '#888',
  marginTop: 4,
},

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
    width: 100,
    height: 110,
    resizeMode: 'contain',
  },

  similarName: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
  },

  cartBar: {
     position: 'absolute',
     bottom: 90,
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

bottomProductBar: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingVertical: 16,
  paddingHorizontal: 18,
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

infoSection: {
  marginTop: 6,
},

title: {
  fontSize: 20,
  fontWeight: '700',
},

weight: {
  color: '#888',
  marginTop: 6,
  fontSize: 14,
},

price: {
  fontSize: 18,
  fontWeight: '700',
  marginTop: 12,
},

mrp: {
  fontSize: 14,
  fontWeight: '400',
},

detailsLink: {
  color: '#ff7a00',
  marginTop: 8,
  fontWeight: '500',
},
headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

logo: {
  width: 65,
  height: 65,
  resizeMode: 'contain',
},

menuDots: {
  fontSize: 35,
  fontWeight: 'bold',
},

moreTitle: {
  marginTop: 30,
  fontSize: 16,
  fontWeight: '700',
},

moreCard: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 10,
  marginTop: 13,
  elevation: 3,
},

moreImg: {
  width: '100%',
  height: 100,
  resizeMode: 'contain',
},

moreName: {
  fontWeight: '600',
  marginTop: 6,
},

morePrice: {
  fontWeight: 'bold',
  marginTop: 4,
},

});
