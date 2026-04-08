import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const categories = [
  { id: 'a1',  title: 'Dairy & Bread',           image: require('../assets/cat1.png') },
  { id: 'a2',  title: 'Cold Drink & Juices',      image: require('../assets/cat5.png') },
  { id: 'a3',  title: 'Tea, Coffee & More',        image: require('../assets/cat2.png') },
  { id: 'a4',  title: 'Masala,Dry Fruits & More', image: require('../assets/cat4.png') },
  { id: 'a5',  title: 'Munchies',                 image: require('../assets/cat3.png') },
  { id: 'a6',  title: 'Sweets Craving',           image: require('../assets/cat99.png') },
  { id: 'a7',  title: 'Biscuits',                 image: require('../assets/cat2.png') },
  { id: 'a8',  title: 'Packaged Food',            image: require('../assets/cat1.png') },
  { id: 'a9',  title: 'Breakfast & Sauces',       image: require('../assets/cat3.png') },
  { id: 'a10', title: 'Health & Baby Care',       image: require('../assets/cat4.png') },
  { id: 'a11', title: 'Bath & Body',              image: require('../assets/cat99.png') },
  { id: 'a12', title: 'Cleaning Essentials',      image: require('../assets/cat5.png') },
];

const favoriteItems = [
  { id: 'f1', name: 'Atta',                       weight: '500 g', mrp: '₹25', price: '₹24', discount: '5% off', image: require('../assets/atta.png') },
  { id: 'f2', name: 'Kurkure',  weight: '91 g',  price: '₹22', image: require('../assets/kurkure.png') },
  { id: 'f3', name: 'Kurkure Lite',                weight: '50 g',  price: '₹22', image: require('../assets/kurkure.png') },
];

const productsByCategory: Record<string, any[]> = {
  'Dairy & Bread':           [{ id:'c1', name:'Aashirvaad Atta', price:'₹350', image:require('../assets/atta.png') },   { id:'c2', name:'Basmati Rice',  price:'₹400', image:require('../assets/rice.png') }],
  'Cold Drink & Juices':     [{ id:'f7', name:'Coca Cola',       price:'₹40',  image:require('../assets/coke.png') },   { id:'f8', name:'Pepsi',         price:'₹40',  image:require('../assets/pepsi.png') }, { id:'f9', name:'Real Juice', price:'₹99', image:require('../assets/juice.png') }],
  'Tea, Coffee & More':      [{ id:'s4', name:'Lays Classic',    price:'₹20',  image:require('../assets/lays.png') },   { id:'s5', name:'Kurkure',       price:'₹20',  image:require('../assets/kurkure.png') }],
  'Masala,Dry Fruits & More':[{ id:'m16',name:'Oil',             price:'₹120', image:require('../assets/oil2.png') },   { id:'m19',name:'Spices',        price:'₹50',  image:require('../assets/spices.png') }],
  'Munchies':                [{ id:'k11',name:'Munchies',        price:'₹40',  image:require('../assets/cart3.png') },  { id:'k12',name:'Kurkure',       price:'₹20',  image:require('../assets/kurkure.png') }, { id:'k13',name:'Bingo', price:'₹25', image:require('../assets/bingo.png') }],
  'Sweets Craving':          [{ id:'j10',name:'Sweet',           price:'₹60',  image:require('../assets/facewash.png')}],
  'Biscuits':                [{ id:'b1', name:'Lays',            price:'₹20',  image:require('../assets/lays.png') }],
  'Packaged Food':           [{ id:'p1', name:'Dal',             price:'₹199', image:require('../assets/dal.png') }],
  'Breakfast & Sauces':      [{ id:'br1',name:'Atta',            price:'₹350', image:require('../assets/atta.png') }],
  'Health & Baby Care':      [{ id:'h1', name:'Shampoo',         price:'₹180', image:require('../assets/shampoo.png')}],
  'Bath & Body':             [{ id:'bb1',name:'Face Wash',       price:'₹120', image:require('../assets/facewash.png')}],
  'Cleaning Essentials':     [{ id:'ce1',name:'Oil',             price:'₹120', image:require('../assets/oil2.png') }],
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const HomeScreen = () => {
  const { userName } = useUser();
  const navigation   = useNavigation();
  const { cartItems, addToCart } = useCart();
  const [menuVisible,      setMenuVisible]      = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalItems = cartItems.reduce((t, i) => t + (i.quantity || 1), 0);

  const handleAdd = (item: any) => {
    addToCart({
      id:       item.id,
      name:     item.name,
      price:    Number(String(item.price).replace('₹', '')),
      image:    item.image,
      quantity: 1,
    });
  };

  const displayName = userName
    ? userName.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Guest';

  // ── CATEGORY DETAIL ────────────────────────────────────────────────────────
  if (selectedCategory) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.catHeader}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.catHeaderTitle}>{selectedCategory}</Text>
            <Text style={styles.catHeaderSub}>Delivering to: 123 MG ROAD, BANGALURU</Text>
          </View>
          <Text style={{ fontSize: 20 }}>🔍</Text>
        </View>

        {/* Filter pills */}
        <View style={styles.filterRow}>
          {['Filters','Sort','Prices','Brand'].map(f => (
            <Text key={f} style={styles.filterPill}>{f}</Text>
          ))}
        </View>

        {/* Products grid */}
        <FlatList
          data={productsByCategory[selectedCategory] || []}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 12, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              <Image source={item.image} style={styles.productImg} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productRating}>⭐⭐⭐⭐⭐ (3,859)</Text>
              <Text style={styles.productDelivery}>🟢 11 MINS</Text>
              <Text style={styles.productStock}>Only 1 left</Text>
              <View style={styles.productPriceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
                  <Text style={styles.addBtnText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Cart bar */}
        {totalItems > 0 && (
          <TouchableOpacity style={styles.cartBar} onPress={() => navigation.navigate('Cart')} activeOpacity={0.9}>
            <View style={styles.cartThumbWrap}>
              <Image source={require('../assets/cart.png')} style={styles.cartThumb} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cartBarTitle}>View cart</Text>
              <Text style={styles.cartBarSub}>{totalItems} item{totalItems !== 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.cartArrowCircle}>
              <Text style={styles.cartArrow}>➜</Text>
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }

  // ── HOME ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#ebebeb" />

      {/* ══════════════════════════════════════
          TOP BAR
          Logo circle | delivery info | ≡ btn
      ══════════════════════════════════════ */}
      <View style={styles.topBar}>

        {/* Top Row → ONLY LOGO */}
        <View style={styles.topRow}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom Row → DELIVERY + MENU */}
        <View style={styles.bottomRow}>

          <View style={styles.deliveryBlock}>
            <Text style={styles.deliveryMinutes}>13 Minutes</Text>

            <View style={styles.deliveryAddressRow}>
              <Text style={styles.deliveryToHome}>To Home – </Text>
              <Text style={styles.deliveryAddress} numberOfLines={1}>
                123 MG ROAD, BANGALURU
              </Text>
              <Text style={styles.deliveryChevron}> ▾</Text>
            </View>
          </View>

          {/* Menu button on right */}
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => setMenuVisible(true)}
          >
            <View style={styles.burger} />
            <View style={styles.burger} />
            <View style={styles.burger} />
          </TouchableOpacity>

        </View>

      </View>

      {/* ══════════════════════════════════════
          SEARCH ROW
          Pill search | ≡ circle
      ══════════════════════════════════════ */}
      <View style={styles.searchRow}>
        <View style={styles.searchPill}>
          <Text style={styles.searchMag}>🔍</Text>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#b0b0b0"
            style={styles.searchInput}
          />
        </View>

      </View>

      {/* ══════════════════════════════════════
          SCROLL BODY
      ══════════════════════════════════════ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >

        {/* ── MEGA SALE BANNER ── */}
        <View style={styles.bannerWrap}>
          <Image
            source={require('../assets/banner.png')}
            style={styles.bannerImg}
            resizeMode="cover"
          />
        </View>

        {/* ── YOUR FAVOURITE ITEMS ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Your Favourite Items</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All ▶</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={favoriteItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.favCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              {/* Discount badge */}
              {item.discount && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.discount}</Text>
                </View>
              )}

              <Image source={item.image} style={styles.favImg} />

              <Text style={styles.favName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.favWeight}>{item.weight}</Text>
              {item.mrp ? <Text style={styles.favMrp}>{item.mrp}</Text> : null}

              <View style={styles.favBottom}>
                <Text style={styles.favPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.favPlusBtn} onPress={() => handleAdd(item)}>
                  <Text style={styles.favPlusText}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* ── EXPLORE BY CATEGORIES ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Explore By Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All ▶</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.catCell}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(item.title)}
            >
              <View style={styles.catBox}>
                <Image source={item.image} style={styles.catImg} />
              </View>
              <Text style={styles.catLabel} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

      </ScrollView>

      {/* ══════════════════════════════════════
          PROFILE MODAL
      ══════════════════════════════════════ */}
 <Modal
   transparent
   animationType="fade"
   visible={menuVisible}
   onRequestClose={() => setMenuVisible(false)}
 >
   <View style={[styles.modalOverlay, { zIndex: 9999, elevation: 9999 }]}>

     {/* Click outside to close */}
     <TouchableOpacity
       style={{ flex: 1 }}
       activeOpacity={1}
       onPress={() => setMenuVisible(false)}
     />

          <View style={styles.profileCard}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setMenuVisible(false)}>
              <Text style={{ color: '#fff', fontSize: 15 }}>✕</Text>
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={{ fontSize: 34, color: '#fff' }}>👤</Text>
            </View>
            <Text style={styles.profileName}>{displayName}</Text>
            <View style={styles.divider} />
            {[
              { label: '⚙️ Settings', screen: 'Settings' },
              { label: '📦 My Orders', screen: 'MyOrders' },
            ].map(btn => (
              <TouchableOpacity
                key={btn.screen}
                style={styles.menuBtn}
                onPress={() => { setMenuVisible(false); navigation.navigate(btn.screen as never); }}
              >
                <Text style={styles.menuBtnText}>{btn.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => { setMenuVisible(false); navigation.replace('Login'); }}
            >
              <Text style={[styles.menuBtnText, { color: 'red' }]}>🔐 Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default HomeScreen;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // Root
 root: {
   flex: 1,
   backgroundColor: '#ffffff', // 🔥 FIXED
 },



  // Orange logo circle (matches reference exactly)
logoCircle: {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 4,
},
  logoImg: { width: 50, height: 50 },

  // Delivery text block
  deliveryBlock: { flex: 1 },
deliveryMinutes: {
  fontSize: 18,
  fontWeight: '800',
  color: '#ff7a00',
},
  deliveryAddressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 1 },
  deliveryToHome:    { fontSize: 12, color: '#111', fontWeight: '700' },
  deliveryAddress:   { fontSize: 12, color: '#111', maxWidth: 128 },
  deliveryChevron:   { fontSize: 11, color: '#111' },

  // Shared white bordered circle button (topBar + searchRow)
 iconCircle: {
   width: 40,
   height: 40,
   borderRadius: 20,
   borderWidth: 1.5,
   borderColor: '#d0d0d0',
   backgroundColor: '#ffffff',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: 10, // 🔥 VERY IMPORTANT
   elevation: 5, // Android fix
 },
  // Hamburger lines inside circle
  burger: {
    width:        16,
    height:       2,
    borderRadius: 1,
    backgroundColor: '#444',
    marginVertical:  2,
  },

  // ── Search Row ─────────────────────────────────────────────────────────────
 searchRow: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingHorizontal: 16,
   paddingBottom: 12,
 },
 searchPill: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#f3eaea',   // 🔥 light pink/beige
   borderRadius: 30,
   paddingHorizontal: 16,
   height: 48,                   // 🔥 fixed height
   borderWidth: 1,
   borderColor: '#e5dede',
 },
  searchMag:   { fontSize: 15, marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // ── Banner ─────────────────────────────────────────────────────────────────
  bannerWrap: {
    marginHorizontal: 14,
    marginBottom:     4,
    borderRadius:     18,
    overflow:         'hidden',
    height:           165,
  },
  bannerImg: { width: '100%', height: '100%' },

  // ── Section header row ─────────────────────────────────────────────────────
  sectionRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    paddingHorizontal: 14,
    marginTop:      18,
    marginBottom:   10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  seeAll:       { fontSize: 13, color: '#ff7a00', fontWeight: '600' },

  // ── Favourite Cards ────────────────────────────────────────────────────────
  favCard: {
    width:           122,
    backgroundColor: '#ffffff',
    borderRadius:    16,
    padding:         10,
    marginRight:     12,
    elevation:       2,
    shadowColor:     '#000',
    shadowOpacity:   0.07,
    shadowRadius:    5,
    shadowOffset:    { width: 0, height: 2 },
  },

  // Orange discount badge (top-left corner)
  badge: {
    position:         'absolute',
    top:              8,
    left:             8,
    zIndex:           2,
    backgroundColor:  '#ff7a00',
    borderRadius:     6,
    paddingHorizontal: 6,
    paddingVertical:   2,
  },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },

  favImg:    { width: '100%', height: 82, resizeMode: 'contain', marginBottom: 6 },
  favName:   { fontSize: 12, fontWeight: '600', color: '#111', lineHeight: 16 },
  favWeight: { fontSize: 11, color: '#aaa', marginTop: 1 },
  favMrp:    { fontSize: 11, color: '#bbb', textDecorationLine: 'line-through', marginTop: 1 },

  favBottom: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginTop:      6,
  },
  favPrice: { fontSize: 14, fontWeight: '800', color: '#111' },
  favPlusBtn: {
    width:           28,
    height:          28,
    borderRadius:    8,
    borderWidth:     1.5,
    borderColor:     '#e0e0e0',
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: '#fff',
  },
  favPlusText: { fontSize: 20, color: '#ff7a00', fontWeight: '700', lineHeight: 24 },

  // ── Category Grid ──────────────────────────────────────────────────────────
  catCell: {
    flex:           1,
    alignItems:     'center',
    marginHorizontal: 3,
    marginBottom:   14,
  },
  catBox: {
    width:           68,
    height:          68,
    backgroundColor: '#e0e0e0',
    borderRadius:    16,
    justifyContent:  'center',
    alignItems:      'center',
    marginBottom:    5,
    overflow:        'hidden',
  },
  catImg:   { width: 56, height: 56, resizeMode: 'contain' },
  catLabel: {
    fontSize:        10.5,
    textAlign:       'center',
    color:           '#333',
    fontWeight:      '500',
    lineHeight:      13,
    paddingHorizontal: 2,
  },

  // ── Category Detail Screen ─────────────────────────────────────────────────
  catHeader: {
    flexDirection:    'row',
    alignItems:       'center',
    paddingHorizontal: 12,
    paddingVertical:   12,
    backgroundColor:  '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn:       { fontSize: 22, marginRight: 10, color: '#333' },
  catHeaderTitle: { fontWeight: '700', fontSize: 16, color: '#111' },
  catHeaderSub:   { fontSize: 12, color: '#ff7a00' },

  filterRow: {
    flexDirection:    'row',
    paddingHorizontal: 12,
    paddingVertical:   8,
    backgroundColor:  '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterPill: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical:   6,
    borderRadius:     20,
    marginRight:      8,
    fontSize:         13,
    color:            '#333',
  },

  // ── Product Card ───────────────────────────────────────────────────────────
  productCard: {
    width:           '48%',
    backgroundColor: '#fff',
    borderRadius:    16,
    padding:         12,
    marginBottom:    14,
    elevation:       2,
  },
  productImg:      { width: '100%', height: 120, resizeMode: 'contain' },
  productName:     { fontWeight: '600', marginTop: 8, fontSize: 13 },
  productRating:   { fontSize: 11, marginTop: 4, color: '#888' },
  productDelivery: { color: 'green', fontSize: 12, marginTop: 3 },
  productStock:    { color: 'red', fontSize: 12 },
  productPrice:    { fontWeight: 'bold', marginTop: 6, fontSize: 15 },
  productPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  addBtn: {
    borderWidth:     1.5,
    borderColor:     '#ff7a00',
    borderRadius:    10,
    paddingHorizontal: 14,
    paddingVertical:   4,
    backgroundColor: '#fff',
  },
  addBtnText: { color: '#ff7a00', fontWeight: 'bold', fontSize: 13 },

  // ── Cart Bar ───────────────────────────────────────────────────────────────
  cartBar: {
    position:         'absolute',
    bottom:           70,
    left:             60,
    right:            60,
    height:           58,
    backgroundColor:  '#F7931E',
    borderRadius:     29,
    paddingHorizontal: 14,
    flexDirection:    'row',
    alignItems:       'center',
    zIndex:           999,
    elevation:        10,
  },
  cartThumbWrap: {
    width:           42,
    height:          42,
    borderRadius:    21,
    backgroundColor: '#FFE0B2',
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     10,
  },
  cartThumb:     { width: 26, height: 26, resizeMode: 'contain' },
  cartBarTitle:  { color: '#111', fontWeight: '700', fontSize: 14 },
  cartBarSub:    { color: '#444', fontSize: 12, marginTop: 1 },
  cartArrowCircle: {
    width:           36,
    height:          36,
    borderRadius:    18,
    backgroundColor: '#F57C00',
    justifyContent:  'center',
    alignItems:      'center',
  },
  cartArrow: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // ── Profile Modal ──────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
  },
profileCard: {
  position: 'absolute',
  top: 80,
  right: 14,
  width: 280,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  elevation: 20,  // 🔥 increase
  zIndex: 9999,   // 🔥 ADD THIS
  alignItems: 'center',
},
  closeBtn: {
    position:        'absolute',
    right:           10,
    top:             10,
    backgroundColor: '#222',
    width:           28,
    height:          28,
    borderRadius:    14,
    justifyContent:  'center',
    alignItems:      'center',
    zIndex:          10,
  },
  avatarCircle: {
    width:           80,
    height:          80,
    borderRadius:    40,
    backgroundColor: '#222',
    justifyContent:  'center',
    alignItems:      'center',
    marginTop:       10,
  },
  profileName: { marginTop: 10, fontSize: 17, fontWeight: '700', color: '#ff7a00' },
  divider:     { width: '100%', height: 1, backgroundColor: '#eee', marginVertical: 12 },
  menuBtn: {
    width:           '100%',
    backgroundColor: '#f5f5f5',
    padding:         13,
    borderRadius:    12,
    marginVertical:  4,
    elevation:       1,
  },
  menuBtnText: { fontSize: 15, fontWeight: '600', textAlign: 'center', color: '#111' },

  topBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },

bottomRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

deliveryBlock: {
  flex: 1,
  marginRight: 10, // 🔥 THIS FIXES TOUCH ISSUE
},
});