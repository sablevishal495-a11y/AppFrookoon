import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');
const ORANGE = '#FF6B00';

const VARIANTS = [
  { id: 'v1', weight: '500 gms', price: 24, mrp: 25, perUnit: '₹ 4.4 / 100 gms', discount: 4 },
  { id: 'v2', weight: '1 kg',    price: 40, mrp: 42, perUnit: '₹ 4 / 100 gms',   discount: 5 },
  { id: 'v3', weight: '1.5 kg',  price: 54, mrp: 57, perUnit: '₹ 3.6 / 100 gms', discount: 5 },
];

const toNum = v => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return parseFloat(v.replace(/[^\d.]/g, '')) || 0;
  return 0;
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // ── ALL HOOKS FIRST ──
  const [activeVariant, setVariant] = useState(VARIANTS[0]);
  const [dotIndex, setDotIndex]     = useState(0);

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem   = cartItems.find(i => i.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const similarProducts = [
    { id: 's1', name: 'Rice Bag',      price: 350,  image: require('../assets/rice.png') },
    { id: 's2', name: 'Kurkure',       price: 20,  image: require('../assets/kurkure.png') },
    { id: 's3', name: 'Shampoo', price: 135,  image: require('../assets/shampoo.png') },
    { id: 's4', name: 'Atta',        price: 380, image: require('../assets/atta.png') },
  ];

const brands = [
  { id: 'b1', name: 'Aashirvaad', image: require('../assets/ashirvad.png') },
  { id: 'b2', name: 'Fortune', image: require('../assets/fortune.png') },
  { id: 'b3', name: 'Whole Farm', image: require('../assets/wholefarm.png') },
  { id: 'b4', name: 'Silver Coin', image: require('../assets/silvercoin.png') },
];

  const carouselImages  = product.images ?? [product.image];
  const cartQtyTotal    = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
  const cartTotal       = cartItems.reduce((s, i) => s + toNum(i.price) * (i.quantity || 0), 0);

  // When cart strip is visible: pad = cartStrip(52) + bottomBar(72) = 124, else 72
 const bottomPad = cartItems.length > 0 ? 60 : 20;

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

      {/* ── TOP NAV ── */}
      {/* ── HEADER ── */}
      <View style={styles.headerContainer}>

        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.headerLogo}
        />

        {/* Row: back + location + avatar */}
        <View style={styles.headerRow}>

          {/* Back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={22} color="#FF6B00" />
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.headerLocation}>
            <Icon name="map-pin" size={16} color="#FF6B00" />
            <Text style={styles.headerLocationText} numberOfLines={1}>
              HOME - 123 MG ROAD ...
            </Text>
            <Icon name="chevron-down" size={16} color="#FF6B00" />
          </View>

          {/* Avatar */}
          <View style={styles.headerAvatar}>
            <Icon name="user" size={16} color="#fff" />
          </View>

        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad }}
      >

        {/* ── IMAGE CAROUSEL ── */}
        <View style={styles.carouselOuter}>
          <ScrollView
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={SCREEN_W - 32}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            onMomentumScrollEnd={e => {
              const idx = Math.round(
                e.nativeEvent.contentOffset.x / (SCREEN_W - 32)
              );
              setDotIndex(Math.max(0, idx));
            }}
          >
            {carouselImages.map((img, i) => (
              <View key={i} style={styles.carouselSlide}>
                <Image source={img} style={styles.carouselImage} />
              </View>
            ))}
          </ScrollView>

          {/* Dots */}
          <View style={styles.dotsRow}>
            {carouselImages.map((_, i) => (
              <View key={i} style={[styles.dot, i === dotIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* ── PRODUCT NAME ── */}
        <View style={styles.card}>
          <Text style={styles.productName}>{product.name.toUpperCase()}</Text>
        </View>

        {/* ── VARIANT SELECTOR ── */}
        <View style={[styles.card, { marginTop: 2, paddingTop: 12 }]}>
          <Text style={styles.variantLabel}>Select Quantity</Text>
          <View style={styles.variantsRow}>
            {VARIANTS.map(v => (
              <TouchableOpacity
                key={v.id}
                style={[
                  styles.variantChip,
                  activeVariant.id === v.id && styles.variantChipActive,
                ]}
                onPress={() => setVariant(v)}
                activeOpacity={0.8}
              >
                {/* CIRCULAR STAMP BADGE — matches Image 1 */}
                <View style={styles.circleStamp}>
                  <Text style={styles.circleStampLine1}>{v.discount}%</Text>
                  <Text style={styles.circleStampLine2}>off</Text>
                </View>

                <Text style={styles.variantWeight}>{v.weight}</Text>
                <Text style={styles.variantPrice}>₹{v.price}</Text>
                <Text style={styles.variantPer}>{v.perUnit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── PRICE ROW + ADD/QTY ── */}
        <View style={[styles.card, styles.priceCard, { marginTop: 1 }]}>
          <View style={styles.priceLeft}>
            <Text style={styles.currentPrice}>₹{activeVariant.price}</Text>
            <Text style={styles.oldPrice}> ₹{activeVariant.mrp}</Text>
            <View style={styles.offBadge}>
              <Text style={styles.offBadgeText}>{activeVariant.discount}% OFF</Text>
            </View>
          </View>

          {currentQty === 0 ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() =>
                addToCart({ ...product, price: activeVariant.price, quantity: 1 })
              }
              activeOpacity={0.85}
            >
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyControl}>
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
                onPress={() => decreaseQty(product.id)}
              >
                <Text style={styles.qtyControlBtn}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyControlNum}>{currentQty}</Text>
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
                onPress={() => increaseQty(product.id)}
              >
                <Text style={styles.qtyControlBtn}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── PRODUCT INFORMATION ── */}
        <View style={[styles.card, { marginTop: 8 }]}>
          {/* Header: title left, expiry box right */}
          <View style={styles.infoHeaderRow}>
            <Text style={styles.sectionTitle}>Product Information</Text>
            <View style={styles.expiryBox}>
              <Text style={styles.expiryBoxLabel}>EXPIRY DATE</Text>
              <Text style={styles.expiryBoxVal}>12 Jul 2023</Text>
            </View>
          </View>

          {/* 2-col grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCol}>
              <Text style={styles.infoKey}>COUNTRY OF ORIGIN</Text>
              <Text style={styles.infoVal}>India</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoKey}>EXPIRY DATE</Text>
              <Text style={styles.infoVal}>12 Jul 2023</Text>
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Text style={styles.infoKey}>SHELF LIFE</Text>
            <Text style={styles.infoVal}>24 Months</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.infoKey}>MANUFACTURER NAME</Text>
            <Text style={styles.infoVal}>Tata Consumers Limited</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.infoKey}>MANUFACTURER ADDRESS</Text>
            <Text style={[styles.infoVal, { lineHeight: 20 }]}>
              Tata Food Zone, Polt No 5/B, Phase 2, IDA,{'\n'}Cherlapally - 50005.
            </Text>
          </View>
        </View>

        {/* ── FREQUENTLY BOUGHT TOGETHER ── */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Frequently Bought Together</Text>

          <FlatList
            data={similarProducts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 14, gap: 12 }}
            renderItem={({ item }) => {
              const inCart     = cartItems.find(c => c.id === item.id);
              const discounted = Math.round(toNum(item.price) * 0.96);
              return (
                <TouchableOpacity
                  style={styles.freqCard}
                  activeOpacity={0.85}
                  onPress={() => navigation.push('ProductDetails', { product: item })}
                >
                  <View style={styles.freqCircleStamp}>
                    <Text style={styles.freqCircleLine1}>4%</Text>
                    <Text style={styles.freqCircleLine2}>off</Text>
                  </View>

                  <Image source={item.image} style={styles.freqImg} />
                  <Text style={styles.freqName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.freqWeight}>1 kg</Text>

                  <View style={styles.freqPriceRow}>
                    <View>
                      <Text style={styles.freqOldPrice}>₹{toNum(item.price)}</Text>
                      <Text style={styles.freqPrice}>₹{discounted}</Text>
                    </View>
                    {inCart ? (
                      <View style={styles.freqQtyBox}>
                        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                          <Text style={styles.freqQtyBtn}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.freqQtyNum}>{inCart.quantity}</Text>
                        <TouchableOpacity onPress={() => increaseQty(item.id)}>
                          <Text style={styles.freqQtyBtn}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.freqAddBtn}
                        onPress={() =>
                          addToCart({ ...item, price: toNum(item.price), quantity: 1 })
                        }
                      >
                        <Text style={styles.freqAddIcon}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

    {/* ── BRANDS IN THIS CATEGORY ── */}
    <View style={[styles.card, { marginTop: 8 }]}>
      <Text style={styles.sectionTitle}>Brands in this category</Text>

      <FlatList
        data={brands}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 14, gap: 12 }}
        renderItem={({ item }) => (
<TouchableOpacity
  style={styles.brandCard}
  activeOpacity={0.8}
  onPress={() =>
    navigation.navigate('BrandProducts', { brand: item.name })
  }
>
  <View style={styles.brandBox}>
    <Image source={item.image} style={styles.brandImg} />
  </View>

  <Text style={styles.brandName}>{item.name}</Text>
</TouchableOpacity>
        )}
      />
    </View>

      </ScrollView>

      {/* ── VIEW CART STRIP — only when cart has items ── */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.viewCartStrip}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.92}
        >
          {/* Left: count | price */}
          <Text style={styles.viewCartCount}>
            {cartQtyTotal} item{cartQtyTotal !== 1 ? 's' : ''}
          </Text>
          <View style={styles.viewCartDivider} />
          <Text style={styles.viewCartPrice}>₹{cartTotal}</Text>

          <View style={{ flex: 1 }} />

          {/* Right: icon box + label */}
      {/* Right: cart button */}
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icon name="shopping-bag" size={22} color="#fff" />
      <Text style={styles.viewCartLabel}>View Cart</Text>
    </View>



        </TouchableOpacity>
      )}



    </View>
  );
};

export default ProductDetailsScreen;

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = StyleSheet.create({

  /* TOP NAV */
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  backIcon:     { fontSize: 20, fontWeight: '700', color: '#111' },
  locationRow:  { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  locationPin:  { fontSize: 14, color: ORANGE },
  locationText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#111' },
  locationDrop: { fontSize: 12, color: '#555' },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarIcon: { fontSize: 16 },

  /* LOGO */
  logoRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 14, paddingTop: 8, paddingBottom: 6,
  },
  logo: { width: 46, height: 46, resizeMode: 'contain' },

  /* CAROUSEL */
  carouselOuter: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 14,
  },
  carouselSlide: {
    width: SCREEN_W - 32,
    height: 300,
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot:       { width: 7,  height: 7,  borderRadius: 4, backgroundColor: '#ddd' },
  dotActive: { width: 18, height: 7,  borderRadius: 4, backgroundColor: ORANGE },

  /* CARD */
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 16, paddingVertical: 14,
    marginTop: 6,
  },
  productName: { fontSize: 17, fontWeight: '700', color: '#111' },

  /* VARIANTS */
  variantLabel: { fontSize: 13, color: '#888', marginBottom: 16 },
  variantsRow:  { flexDirection: 'row', gap: 8 },
  variantChip: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingTop: 22,
    paddingBottom: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  variantChipActive: { borderColor: ORANGE, backgroundColor: '#fff4ee' },

  /* ── CIRCULAR STAMP (matches Image 1) ── */
  circleStamp: {
    position: 'absolute',
    top: -14,
    right: -8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  circleStampLine1: { color: '#fff', fontSize: 10, fontWeight: '900', lineHeight: 12 },
  circleStampLine2: { color: '#fff', fontSize: 8,  fontWeight: '700', lineHeight: 10 },

  variantWeight: { fontSize: 12, fontWeight: '600', color: '#333' },
  variantPrice:  { fontSize: 14, fontWeight: '700', color: '#111', marginTop: 4 },
  variantPer:    { fontSize: 10, color: '#888', marginTop: 3 },

  /* PRICE ROW */
  priceCard: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 8,
  },
  priceLeft:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  currentPrice: { fontSize: 20, fontWeight: '800', color: ORANGE },
  oldPrice:     { fontSize: 14, color: '#aaa', textDecorationLine: 'line-through' },
  offBadge: {
    backgroundColor: '#e6f4ea', borderRadius: 4,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  offBadgeText: { fontSize: 11, fontWeight: '700', color: '#2e7d32' },

  /* ADD BUTTON */
  addBtn: {
    backgroundColor: ORANGE, borderRadius: 8,
    paddingHorizontal: 30, paddingVertical: 13,
  },
  addBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 1.5 },

  /* QTY CONTROL — used in price row AND bottom bar */
  qtyControl: {
    flexDirection: 'row',
    backgroundColor: ORANGE,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 18,
  },
  qtyControlBtn: { color: '#fff', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  qtyControlNum: { color: '#fff', fontWeight: '700', fontSize: 17, minWidth: 20, textAlign: 'center' },

  /* PRODUCT INFO */
  infoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111' },

  /* Expiry box (bordered, top-right) */
  expiryBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  expiryBoxLabel: { fontSize: 9,  fontWeight: '700', color: '#888', letterSpacing: 0.3 },
  expiryBoxVal:   { fontSize: 12, fontWeight: '700', color: '#111', marginTop: 2 },

  infoGrid: { flexDirection: 'row' },
  infoCol:  { flex: 1 },
  infoKey:  { fontSize: 11, fontWeight: '700', color: '#888', marginBottom: 3 },
  infoVal:  { fontSize: 13, color: '#111', fontWeight: '500' },

  /* FREQUENTLY BOUGHT TOGETHER */
  freqCard: {
    width: 130, backgroundColor: '#fff',
    borderRadius: 10, borderWidth: 1, borderColor: '#eee',
    padding: 10, position: 'relative',
  },
  freqCircleStamp: {
    position: 'absolute',
    top: 6, right: 6,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: ORANGE,
    justifyContent: 'center', alignItems: 'center',
    zIndex: 1, elevation: 2,
  },
  freqCircleLine1: { color: '#fff', fontSize: 9,  fontWeight: '900', lineHeight: 11 },
  freqCircleLine2: { color: '#fff', fontSize: 7,  fontWeight: '700', lineHeight: 9  },
  freqImg:    { width: '100%', height: 90, resizeMode: 'contain', marginBottom: 8 },
  freqName:   { fontSize: 12, fontWeight: '600', color: '#111', lineHeight: 16 },
  freqWeight: { fontSize: 11, color: '#888', marginTop: 2, marginBottom: 6 },
  freqPriceRow: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
  },
  freqOldPrice: { fontSize: 11, color: '#aaa', textDecorationLine: 'line-through' },
  freqPrice:    { fontSize: 13, fontWeight: '700', color: '#111' },
  freqAddBtn: {
    width: 28, height: 28, borderRadius: 6,
    borderWidth: 1.5, borderColor: ORANGE,
    justifyContent: 'center', alignItems: 'center',
  },
  freqAddIcon: { color: ORANGE, fontSize: 20, lineHeight: 22, fontWeight: '300' },
  freqQtyBox: {
    flexDirection: 'row', backgroundColor: ORANGE, borderRadius: 6,
    alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2, gap: 4,
  },
  freqQtyBtn: { color: '#fff', fontSize: 16, paddingHorizontal: 2 },
  freqQtyNum: { color: '#fff', fontWeight: '700', fontSize: 13, minWidth: 14, textAlign: 'center' },

  /* ── VIEW CART STRIP ── */
viewCartStrip: {
  position: 'absolute',
  bottom: 20,
  left: 16,
  right: 16,
  paddingHorizontal: 16,
  height: 56,
  backgroundColor: ORANGE,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  paddingHorizontal: 18,

  borderRadius: 18, // 🔥 more rounded like UI

  // Shadow (important for floating look)
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
},

  viewCartCount: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  viewCartDivider: { width: 1, height: 18, backgroundColor: 'rgba(255,255,255,0.45)', marginHorizontal: 14 },
  viewCartPrice: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  viewCartRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  viewCartLabel: { color: '#fff', fontWeight: '700', fontSize: 16 },
  bottomWeight:   { fontWeight: '700', fontSize: 16, color: '#111' },
  bottomPrice:    { fontWeight: '800', fontSize: 16, color: ORANGE },
  bottomOldPrice: { fontSize: 13, color: '#aaa', textDecorationLine: 'line-through' },
  taxText:        { fontSize: 11, color: '#999', marginTop: 2 },

viewCartButton: {
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: 'rgba(255,255,255,0.18)',
  paddingHorizontal: 12,
  paddingVertical: 6,

  borderRadius: 16,
  gap: 6, // 👈 important
},
headerContainer: {
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  paddingTop: 10,
  paddingBottom: 12,
},

headerLogo: {
  width: 50,
  height: 50,
  resizeMode: 'contain',
  marginBottom: 6,
},

headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

headerLocation: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  marginHorizontal: 10,
},

headerLocationText: {
  flex: 1,
  fontSize: 14,
  fontWeight: '600',
  color: '#111',
},

headerAvatar: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
},
brandCard: {
  width: 90,
  alignItems: 'center',
},

brandBox: {
  width: 80,
  height: 80,
  borderRadius: 12,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#eee',
},

brandImg: {
  width: '80%',
  height: '80%',
  resizeMode: 'contain',
},

brandName: {
  fontSize: 11,
  color: '#333',
  marginTop: 6,
  textAlign: 'center',
},


});