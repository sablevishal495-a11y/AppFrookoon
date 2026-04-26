import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/Logo';
import { useCart } from '../context/CartContext';

// ─── Types ────────────────────────────────────────────────────────────────────
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  weight?: string; // ✅ optional weight field
};

// ─── All products for similar section ────────────────────────────────────────
const ALL_PRODUCTS: CartItem[] = [
  { id: 1, name: 'MILK',              price: 30,  weight: '500 ml', image: require('../assets/milk.png'),   quantity: 1 },
  { id: 2, name: 'AMUL CHEESE SLICE', price: 88,  weight: '200 g',  image: require('../assets/cheese.png'), quantity: 1 },
  { id: 3, name: 'Brown Bread',       price: 35,  weight: '400 g',  image: require('../assets/bread.png'),  quantity: 1 },
  { id: 4, name: 'Coca Cola',         price: 40,  weight: '750 ml', image: require('../assets/coke.png'),   quantity: 1 },
  { id: 5, name: 'Haldiram Boondi',   price: 59,  weight: '150 g',  image: require('../assets/boondi.png'), quantity: 1 },
  { id: 6, name: 'Tata Sampann',      price: 135, weight: '1 kg',   image: require('../assets/tata.png'),   quantity: 1 },
];

const DELIVERY_FEE = 35;
const TIP_OPTIONS  = [
  { label: '₹10',    value: 10,  emoji: '🟠' },
  { label: '₹20',    value: 20,  emoji: '🪙' },
  { label: '₹50',    value: 50,  emoji: '🪙' },
  { label: 'Custom', value: -1,  emoji: ''   },
];

// ─── Cart Item Card ───────────────────────────────────────────────────────────
const CartItemCard = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) => (
  <View style={cardStyles.wrap}>

    {/* Remove × */}
    <TouchableOpacity style={cardStyles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
      <Icon name="close" size={14} color="#999" />
    </TouchableOpacity>

    {/* Image */}
    <View style={cardStyles.imgWrap}>
      <Image source={item.image} style={cardStyles.img} />
    </View>

    {/* Name + weight + price */}
    <View style={cardStyles.info}>
      <Text style={cardStyles.name} numberOfLines={2}>{item.name}</Text>

      {/* ✅ Weight/amount badge — shows "500 g", "1 kg", "250 ml" etc */}
      <View style={cardStyles.weightBadge}>
        <Icon name="scale-outline" size={10} color="#888" />
        <Text style={cardStyles.weightText}>{item.weight ?? '500 g'}</Text>
      </View>

      <Text style={cardStyles.price}>₹{item.price}</Text>
    </View>

    {/* Qty stepper */}
    <View style={cardStyles.stepperWrap}>
      <TouchableOpacity style={cardStyles.stepBtn} onPress={onDecrease} activeOpacity={0.8}>
        <Icon name="remove" size={16} color="#fff" />
      </TouchableOpacity>
      <Text style={cardStyles.qty}>{item.quantity}</Text>
      <TouchableOpacity style={[cardStyles.stepBtn, cardStyles.stepBtnAdd]} onPress={onIncrease} activeOpacity={0.8}>
        <Icon name="add" size={16} color="#fff" />
      </TouchableOpacity>
    </View>

  </View>
);

// ─── Similar Product Card ─────────────────────────────────────────────────────
// ✅ Fixed layout: image on top, then name, then weight+price on LEFT, + on RIGHT
const SimilarCard = ({
  item,
  onAdd,
}: {
  item: CartItem;
  onAdd: () => void;
}) => (
  <View style={simStyles.card}>

    {/* Discount badge */}
    <View style={simStyles.discountBadge}>
      <Text style={simStyles.discountText}>5%{'\n'}off</Text>
    </View>

    {/* Image */}
    <Image source={item.image} style={simStyles.img} />

    {/* Name */}
    <Text style={simStyles.name} numberOfLines={2}>{item.name}</Text>

    {/* ✅ Bottom row: weight + price on LEFT, + button on RIGHT */}
    <View style={simStyles.bottomRow}>
      <View style={simStyles.bottomLeft}>
        <Text style={simStyles.weight}>{item.weight ?? '1 kg'}</Text>
        <View style={simStyles.priceRow}>
          <Text style={simStyles.originalPrice}>₹{Math.round(item.price / 0.95)}</Text>
          <Text style={simStyles.discountedPrice}>₹{item.price}</Text>
        </View>
      </View>

      {/* + button on right */}
      <TouchableOpacity style={simStyles.addBtn} onPress={onAdd} activeOpacity={0.8}>
        <Icon name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>

  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const CartScreen = () => {
  const navigation = useNavigation<any>();
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const [selectedTip, setSelectedTip] = useState<number>(20);

  const similarProducts = ALL_PRODUCTS.filter(
    p => !cartItems.some(c => c.id === p.id)
  );

  const itemTotal     = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = Math.round(itemTotal / 0.95);
  const deliveryFee   = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const deliverySaved = DELIVERY_FEE;
  const tip           = selectedTip > 0 ? selectedTip : 0;
  const totalPayable  = itemTotal + tip;

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.logoWrapper}><Logo size={100} /></View>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>MY CART</Text>
        </View>
        <View style={styles.emptyWrap}>
          <Icon name="cart-outline" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items to get started</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
            <Text style={styles.shopBtnText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* LOGO */}
        <View style={styles.logoWrapper}>
          <Logo size={45} />
        </View>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>MY CART</Text>
          <View style={styles.cartCountBadge}>
            <Text style={styles.cartCountText}>{cartItems.length}</Text>
          </View>
        </View>

        {/* CART ITEMS */}
        <View style={styles.section}>
          {cartItems.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={() => increaseQty(item.id)}
              onDecrease={() => decreaseQty(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </View>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
            >
              {similarProducts.map(item => (
                <SimilarCard
                  key={item.id}
                  item={item}
                  onAdd={() => addToCart({ ...item, quantity: 1 })}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* DELIVERY PARTNER TIP */}
        <View style={[styles.section, styles.tipCard]}>
          <Text style={styles.tipTitle}>Delivery Partner Tip</Text>
          <Text style={styles.tipSub}>The entire amount will be sent to your delivery partner.</Text>
          <View style={styles.tipRow}>
            {TIP_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.tipBtn, selectedTip === opt.value && styles.tipBtnActive]}
                onPress={() => setSelectedTip(opt.value)}
                activeOpacity={0.8}
              >
                {opt.emoji ? <Text style={styles.tipEmoji}>{opt.emoji}</Text> : null}
                <Text style={[styles.tipBtnText, selectedTip === opt.value && styles.tipBtnTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={[styles.section, styles.priceCard]}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Item Total</Text>
            <View style={styles.priceRight}>
              <Text style={styles.priceOriginal}>₹{originalTotal}</Text>
              <Text style={styles.priceValue}>₹{itemTotal}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: '#22a55b' }]}>
              Delivery Fee (₹{deliverySaved} Saved)
            </Text>
            <View style={styles.priceRight}>
              <Text style={styles.priceOriginal}>₹{deliveryFee}</Text>
              <Text style={[styles.priceValue, { color: '#22a55b' }]}>₹0</Text>
            </View>
          </View>

          {tip > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Partner Tip</Text>
              <Text style={styles.priceValue}>₹{tip}</Text>
            </View>
          )}

          <View style={styles.priceDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceTotalLabel}>Total Payable</Text>
            <Text style={styles.priceTotalValue}>₹{totalPayable}</Text>
          </View>
        </View>

      </ScrollView>

      {/* CHECKOUT BUTTON */}
      <View style={styles.checkoutWrap}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout', {
            totalAmount: totalPayable,
            cartItems,
          })}
          activeOpacity={0.9}
        >
          <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
          <View style={styles.checkoutAmount}>
            <Text style={styles.checkoutAmountText}>₹{totalPayable}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

// ─── Cart Item Card Styles ────────────────────────────────────────────────────
const cardStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    gap: 10,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center',
    zIndex: 1,
  },
  imgWrap: {
    width: 70, height: 70, borderRadius: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#f0f0f0',
  },
  img: { width: 56, height: 56, resizeMode: 'contain' },

  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', lineHeight: 20 },

  // ✅ Weight badge
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  weightText: { fontSize: 11, color: '#666', fontWeight: '600' },

  price: { fontSize: 14, fontWeight: '800', color: '#0047AB', marginTop: 6 },

  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 32, height: 36,
    backgroundColor: '#0047AB',
    justifyContent: 'center', alignItems: 'center',
  },
  stepBtnAdd: { backgroundColor: '#0047AB' },
  qty: {
    width: 32,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
  },
});

// ─── Similar Card Styles ──────────────────────────────────────────────────────
const simStyles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 10,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8, left: 8,
    backgroundColor: '#0047AB',
    borderRadius: 8,
    paddingHorizontal: 5, paddingVertical: 2,
    zIndex: 1,
  },
  discountText: { fontSize: 9, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 12 },

  img: { width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 8, marginTop: 4 },
  name: { fontSize: 12, fontWeight: '700', color: '#1a1a1a', marginBottom: 6, lineHeight: 16 },

  // ✅ Bottom row: left side has weight+price, right side has + button
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  bottomLeft: {
    flex: 1,
  },
  weight: { fontSize: 11, color: '#aaa', fontWeight: '500', marginBottom: 3 },
  priceRow: { flexDirection: 'row', color : '#0047AB',alignItems: 'center', gap: 5 },
  originalPrice: { fontSize: 11, color: '#bbb', textDecorationLine: 'line-through' },
  discountedPrice: { fontSize: 13, fontWeight: '800', color: '#0047AB' },

  addBtn: {
    width: 32, height: 32, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#0047AB',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0047AB',
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f7f7f7' },
  emptyContainer: { flex: 1, backgroundColor: '#fff' },

logoWrapper: { paddingHorizontal: 16, paddingTop: 16, height: 70, justifyContent: 'center' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 10,
  },
  headerText: {
    fontSize: 18, fontWeight: '900',
    color: '#1a1a1a', letterSpacing: 0.5, flex: 1,
  },
  cartCountBadge: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#0047AB',
    justifyContent: 'center', alignItems: 'center',
  },
  cartCountText: { fontSize: 12, fontWeight: '800', color: '#fff' },

  section:      { marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a1a', marginLeft: 16, marginBottom: 12 },

  tipCard: {
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 16, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    borderWidth: 1, borderColor: '#f0f0f0',
  },
  tipTitle: { fontSize: 15, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
  tipSub:   { fontSize: 12, color: '#aaa', marginBottom: 14, lineHeight: 17 },
  tipRow:   { flexDirection: 'row', gap: 10 },
  tipBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5,
    borderColor: '#e0e0e0', backgroundColor: '#fafafa',
  },
  tipBtnActive:     { borderColor: '#0047AB', backgroundColor: '#fff5ee' },
  tipEmoji:         { fontSize: 13 },
  tipBtnText:       { fontSize: 13, fontWeight: '600', color: '#666' },
  tipBtnTextActive: { color: '#0047AB', fontWeight: '800' },

  priceCard: {
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 16, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    borderWidth: 1, borderColor: '#f0f0f0',
  },
  priceRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  priceLabel:  { fontSize: 14, color: '#555', fontWeight: '500' },
  priceRight:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priceOriginal: { fontSize: 12, color: '#bbb', textDecorationLine: 'line-through' },
  priceValue:  { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },
  priceDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  priceTotalLabel: { fontSize: 16, fontWeight: '900', color: '#1a1a1a' },
  priceTotalValue: { fontSize: 18, fontWeight: '900', color: '#0047AB' },

  checkoutWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 20,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    elevation: 10, shadowColor: '#000', shadowOpacity: 0.08,
    shadowRadius: 10, shadowOffset: { width: 0, height: -3 },
  },
  checkoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0047AB', borderRadius: 16,
    paddingVertical: 14, paddingHorizontal: 20,
    elevation: 4, shadowColor: '#0047AB',
    shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
  },
  checkoutText:       { fontSize: 15, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  checkoutAmount:     { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4 },
  checkoutAmountText: { fontSize: 15, fontWeight: '900', color: '#fff' },

  emptyWrap:  { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 80 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#bbb' },
  emptySub:   { fontSize: 14, color: '#ccc' },
  shopBtn:    { marginTop: 10, backgroundColor: '#0047AB', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 12 },
  shopBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});