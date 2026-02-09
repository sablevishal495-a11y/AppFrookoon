import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/Logo';


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


/* ------------------ TYPES ------------------ */
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
};

const ALL_PRODUCTS: CartItem[] = [
  {
    id: 1,
    name: 'MILK',
    price: 30,
    image: require('../assets/milk.png'),
    quantity: 1,
  },
  {
    id: 2,
    name: 'AMUL CHEESE SLICE',
    price: 88,
    image: require('../assets/cheese.png'),
    quantity: 1,
  },
  {
    id: 3,
    name: 'Brown Bread',
    price: 35,
    image: require('../assets/bread.png'),
    quantity: 1,
  },
  {
    id: 4,
    name: 'Coca Cola',
    price: 40,
    image: require('../assets/coke.png'),
    quantity: 1,
  },
  {
    id: 5,
    name: 'Haldiram Boondi',
    price: 59,
    image: require('../assets/boondi.png'),
    quantity: 1,
  },
  {
    id: 6,
    name: 'Tata Sampann',
    price: 135,
    image: require('../assets/tata.png'),
    quantity: 1,
  },
];


/* ------------------ SCREEN ------------------ */
const CartScreen = () => {
    const navigation = useNavigation<any>();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'MILK',
      price: 30,
      quantity: 1,
      image: require('../assets/milk.png'),
    },
    {
      id: 2,
      name: 'AMUL CHEESE SLICE',
      price: 88,
      quantity: 1,
      image: require('../assets/cheese.png'),
    },
{
    id: 3,
    name: 'Brown Bread',
    price: 35,
    image: require('../assets/bread.png'),
    quantity: 1,
  },
  ]);

  const increaseQty = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const similarProducts = ALL_PRODUCTS.filter(
  product => !cartItems.some(cart => cart.id === product.id)
);

return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* ---------- LOGO ---------- */}
      <View style={styles.logoWrapper}>
        <Logo size={45} />
      </View>

      {/* ---------- BACK + CART TITLE ---------- */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          My Cart ({cartItems.length})
        </Text>
      </View>




        {/* ---------- CART ITEMS ---------- */}
        {cartItems.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                <Text style={styles.qtyBtn}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.quantity}</Text>

              <TouchableOpacity onPress={() => increaseQty(item.id)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ---------- SIMILAR PRODUCTS ---------- */}


<Text style={styles.similarTitle}>Similar Product</Text>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 16 }}
>
  {similarProducts.map(item => (
    <View key={item.id} style={styles.similarCard}>
      <Image source={item.image} style={styles.similarImage} />

      <Text style={styles.similarName}>{item.name}</Text>
      <Text style={styles.similarPrice}>₹ {item.price}</Text>

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>


      </ScrollView>

      {/* ---------- CHECKOUT ---------- */}
      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() =>
          navigation.navigate('Checkout', {
            totalAmount: totalAmount,
          })
        }
      >
        <Text style={styles.checkoutText}>
          PROCEED TO CHECKOUT • ₹ {totalAmount}
        </Text>
      </TouchableOpacity>


    </View>
  );
};

export default CartScreen;

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

logoWrapper: {
  paddingHorizontal: 16,
  paddingTop: 16,
},

headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginBottom: 10,
},

headerText: {
  fontSize: 18,
  fontWeight: '700',
  marginLeft: 12,
},


  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 14,
    alignItems: 'center',
  },

  image: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
  },

  price: {
    fontSize: 13,
    color: '#ff8c00',
    marginTop: 6,
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 6,
    backgroundColor: '#FFF',
  },

  qtyBtn: {
    fontSize: 20,
    paddingHorizontal: 6,
    backgroundColor: '#FFF',
  },

  qty: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
  },

  similarTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 16,

    marginTop: 10,
    marginBottom: 10,
  },

  similarRow: {
    flexDirection: 'row',
  },

 similarCard: {
   width: 140,
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 12,
   backgroundColor: '#F5F5F5',
   padding: 10,
   alignItems: 'center',
   marginRight: 12,
 },


  similarImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },

  similarName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  similarPrice: {
    fontSize: 12,
    marginVertical: 6,
  },

  addBtn: {
    backgroundColor: '#ff8c00',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  addText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  checkoutBtn: {
    backgroundColor: '#ff8c00',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});