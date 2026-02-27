import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
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
} from 'react-native';

const categories = [
  { id: 'a1', title: 'Atta, Rice & Dals', image: require('../assets/cat1.png') },
  { id: 'a2', title: 'Green Snacks & Chips', image: require('../assets/cat2.png') },
  { id: 'a3', title: 'Munchies & Snacks', image: require('../assets/cat3.png') },
  { id: 'a4', title: 'Oils, Spices & Dryfruits', image: require('../assets/cat4.png') },
  { id: 'a5', title: 'Cold drinks & juices', image: require('../assets/cat5.png') },
  { id: 'a6', title: 'Beauty & Cosmatics', image: require('../assets/cat99.png') },
];

const deals = [
  { id: 'd1', name: 'Ashirwad Atta', price: '₹350', image: require('../assets/atta.png') },
  { id: 'd2', name: 'Ashirwad Atta', price: '₹400', image: require('../assets/atta2.png') },
  { id: 'd3', name: 'Dal', price: '₹199', image: require('../assets/dal.png') },
  { id: 'd4', name: 'dal', price: '₹135', image: require('../assets/dal.png') },
  { id: 'd5', name: 'Rice', price: '₹400', image: require('../assets/rice.png') },
  { id: 'd6', name: 'Rice', price: '₹40', image: require('../assets/rice.png') },
];

const productsByCategory = {
  "Atta, Rice & Dals": [
    { id: 'c1', name: 'Aashirvaad Atta', price: '₹350', image: require('../assets/atta.png') },
    { id: 'c2', name: 'Basmati Rice', price: '₹400', image: require('../assets/rice.png') },
    { id: 'c3', name: 'Toor Dal', price: '₹199', image: require('../assets/dal.png') },
  ],

  "Green Snacks & Chips": [
    { id: 's4', name: 'Lays Classic', price: '₹20', image: require('../assets/lays.png') },
    { id: 's5', name: 'Kurkure', price: '₹20', image: require('../assets/kurkure.png') },
    { id: 's6', name: 'Bingo', price: '₹25', image: require('../assets/bingo.png') },
  ],

  "Cold drinks & juices": [
    { id: 'f7', name: 'Coca Cola', price: '₹40', image: require('../assets/coke.png') },
    { id: 'f8', name: 'Pepsi', price: '₹40', image: require('../assets/pepsi.png') },
    { id: 'f9', name: 'Real Juice', price: '₹99', image: require('../assets/juice.png') },
  ],

  "Beauty & Cosmatics": [
    { id: 'j10', name: 'Face Wash', price: '₹120', image: require('../assets/facewash.png') },
    { id: 'j11', name: 'Shampoo', price: '₹180', image: require('../assets/shampoo.png') },
  ],

  "Munchies & Snacks":[
      { id:'k11', name: 'Munchies', price:'40', image: require('../assets/cart3.png')},
      {id: 'k12', name: 'Kurkure', price: '₹20', image: require('../assets/kurkure.png') },
      {id: 'k13', name: 'Bingo', price: '₹25', image: require('../assets/bingo.png') },
      {id: 'k14', name: 'Lays Classic', price:'₹20',image: require('../assets/lays.png') },
      {id: 'k15', name: 'Munchies', price: '₹40', image: require('../assets/munchies2.png') },
      ],
  "Oils, Spices & Dryfruits":[
      {id: 'm16', name: 'Oil', price: '₹120', image: require('../assets/oil2.png') },
      {id: 'm17', name: 'Oil', price: '₹120', image: require('../assets/oil2.png') },
      {id: 'm18', name: 'Oil', price: '₹120', image: require('../assets/oil2.png') },
      {id: 'm19', name: 'Spices', price: '₹50', image: require('../assets/spices.png')}
      ],

}


  const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItems, addToCart } = useCart();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const totalItems = cartItems.reduce(
    (t, i) => t + (i.quantity || 1),
    0
  );
  const handleAdd = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price.replace('₹', '')),
      image: item.image,
      quantity: 1,
    });
}

return (
  <View style={styles.container}>
    {selectedCategory ? (
      <View style={{ flex: 1, padding: 1 }}>
        {/* HEADER */}
        <View style={styles.categoryHeader}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text numberOfLines={1} style={styles.categoryTitleHeader}>
              {selectedCategory}
            </Text>
            <Text style={styles.deliveryText}>
              Delivering to: Bajnamath Chowk
            </Text>
          </View>

          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* FILTERS */}
        <View style={styles.filterRow}>
          <Text style={styles.filterBtn}>Filters</Text>
          <Text style={styles.filterBtn}>Sort</Text>
          <Text style={styles.filterBtn}>Prices</Text>
          <Text style={styles.filterBtn}>Brand</Text>
        </View>

        {/* PRODUCTS */}
        <FlatList
          data={productsByCategory[selectedCategory] || []}

          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 140 }}
          renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.productCardNew}
             activeOpacity={0.9}
             onPress={() =>
               navigation.navigate('ProductDetails', { product: item })
             }
           >

              <Image source={item.image} style={styles.productImgNew} />

              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.rating}>⭐⭐⭐⭐⭐ (3,859)</Text>
              <Text style={styles.deliveryTime}>🟢 11 MINS</Text>
              <Text style={styles.onlyLeft}>Only 1 left</Text>

              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>

                <TouchableOpacity
                  style={styles.addBtnRight}
                  onPress={() => handleAdd(item)}
                >
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* CART BAR */}
       {totalItems > 0 && (
         <TouchableOpacity
           style={styles.cartBar}
           onPress={() => navigation.navigate('Cart')}
           activeOpacity={0.9}
         >
           {/* Product Thumbnail */}
           <View style={styles.cartThumbWrap}>
             <Image
               source={require('../assets/cart.png')}
               style={styles.cartThumb}
             />
           </View>

           <View style={{ flex: 1 }}>
             <Text style={styles.cartTitle}>View cart</Text>
             <Text style={styles.cartSub}>
               {totalItems} item{totalItems !== 1 ? 's' : ''}
             </Text>
           </View>

           {/* Arrow */}
           <View style={styles.cartArrowWrap}>
             <Text style={styles.cartArrow}>➜</Text>
           </View>
         </TouchableOpacity>
       )}

      </View>
    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <View>
            <Text style={styles.time}>Welcome to FROOKOON !</Text>
            <Text style={styles.address}>AMIT PATEL</Text>
          </View>

          <TouchableOpacity
            style={styles.profile}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Text style={{ color: '#ff7a00', fontSize: 22 }}>
              {menuVisible ? '✕' : '☰'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <TextInput placeholder="Search..." style={styles.searchInput} />
          <Text style={styles.mic}>🎤 </Text>
        </View>

        <View style={styles.bannerWrapper}>
          <Image
            source={require('../assets/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.categoryTitle}>Shop & Categories</Text>

        <FlatList
          data={categories}
          keyExtractor={(item, index) => item.id + index}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => setSelectedCategory(item.title)}
            >
              <View>
                <Text style={styles.categoryTitleText}>{item.title}</Text>
              </View>

              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.categoryImg} />
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.dealsTitle}>
          Top deals on bestsellers
        </Text>

        <FlatList
         data={deals}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View style={styles.dealCard}>
              <Image source={item.image} style={styles.dealImg} />
              <Text style={styles.dealName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.dealPrice}>{item.price}</Text>
            </View>
          )}
        />
      </ScrollView>
    )}

    {showLocationPopup && (
      <View style={styles.locationSheet}>
        <View style={styles.dragHandle} />

        <View style={styles.locationHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.popupTitle}>
              Device Location Not Enabled
            </Text>
            <Text style={styles.popupSub}>
              Enable your device location for better results
            </Text>
          </View>

          <TouchableOpacity
            style={styles.enableBtnSmall}
            onPress={() => setShowLocationPopup(false)}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.savedTitle}>
          Select a Saved address
        </Text>

        <TouchableOpacity style={styles.addressCard}>
          <Text style={styles.homeIcon}>🏠</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>HOME</Text>
            <Text style={styles.addressText}>
              123 MG ROAD, BANGALURU, KA 560001
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchLocation}>
          <Text>🔍 Search Location Manually</Text>
        </TouchableOpacity>
      </View>
    )}

    <Modal
      transparent
      animationType="fade"
      visible={menuVisible}
      onRequestClose={() => setMenuVisible(false)}
    >
      <View style={styles.menuOverlay}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        />

        <View style={styles.profileMenuCard}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setMenuVisible(false)}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>✕</Text>
          </TouchableOpacity>

          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 34, color: '#fff' }}>👤</Text>
          </View>

          <Text style={styles.profileName}>AMIT PATEL</Text>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Settings');
            }}
          >
            <Text style={styles.menuButtonText}>⚙️ Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('MyOrders');
            }}
          >
            <Text style={styles.menuButtonText}>📦 My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              setMenuVisible(false);
              navigation.replace('Login');
            }}
          >
            <Text style={[styles.menuButtonText, { color: 'red' }]}>
              🔐 Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);

};

export default HomeScreen;




const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  logo: { width: 40, height: 40, marginTop: 10, marginLeft: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 5,
  },

  time: { fontWeight: 'bold', fontSize: 14 },
  address: { fontSize: 13, marginTop: 2 },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#e8c9a0',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  searchInput: { flex: 1, paddingVertical: 10 },
  mic: { fontSize: 18 },

  bannerWrapper: {
    width: '92%',
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 12,
  },

  banner: { width: '100%', height: 160 },

  categoryTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginTop: 14 },
  dealsTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginTop: 10 },

  categoryCard: {
    flex: 1,
    backgroundColor: '#e6c29f',
    margin: 6,
    borderRadius: 20,
    padding: 10,
    height: 120,
  },

  categoryTitleText: { fontSize: 14, fontWeight: 'bold', color: '#2d4b3f' },
  startsAt: { fontSize: 11, color: '#2d4b3f', marginTop: 2 },

  imageBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 60,
    height: 75,
    backgroundColor: '#e6c29f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryImg: { width: 56, height: 56, resizeMode: 'contain' },

  dealCard: {
    width: '31%',
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  dealImg: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 6 },
  dealName: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  dealPrice: { fontSize: 13, color: '#ff7a00', fontWeight: 'bold', marginTop: 2 },

  locationSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#e8c9a0',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },

  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  popupTitle: { fontWeight: 'bold', marginBottom: 6 },
  popupSub: { fontSize: 13 },

  enableBtnSmall: {
    backgroundColor: '#ff7a00',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  savedTitle: { fontWeight: 'bold', marginBottom: 8 },

  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#f3d7b6',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: 'center',
  },

  homeIcon: { fontSize: 20, marginRight: 10 },
  addressTitle: { fontWeight: 'bold' },
  addressText: { fontSize: 12, color: '#444' },

  searchLocation: {
    backgroundColor: '#f3d7b6',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },



popupOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.3)',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  paddingTop: 10,
  paddingRight: 10,
},


popupCard: {
  width: 260,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 18,
  elevation: 8,
},


profileCircle: {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},

popupName: {
  fontWeight: 'bold',
  marginBottom: 10,
},

divider: {
  width: '100%',
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 10,
},

popupBtn: {
  width: '100%',
  padding: 12,
  borderRadius: 12,
  backgroundColor: '#f2f2f2',
  alignItems: 'center',
  marginTop: 10,
  elevation: 2,
},

closeBtn: {
  position: 'absolute',
  right: 10,
  top: 10,
  backgroundColor: '#000',
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},



profileMenuCard: {
  position: 'absolute',
  top: 32,
  right: 12,
  width: 300,
  backgroundColor: '#fff',
  borderRadius: 22,
  padding: 20,
  elevation: 10,
  alignItems: 'center',
},




avatarCircle: {
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},

profileName: {
  marginTop: 12,
  fontSize: 18,
  fontWeight: 'bold',
  color: '#ff7a00',
},

divider: {
  width: '100%',
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 15,
},

menuButton: {
  width: '100%',
  backgroundColor: '#f2f2f2',
  padding: 14,
  borderRadius: 14,
  marginVertical: 6,
  elevation: 3,
},

menuButtonText: {
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
},

menuOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.25)',
},



productCardNew: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 12,
  marginBottom: 14,
  elevation: 3,
},

productImgNew: {
  width: '100%',
  height: 120,
  resizeMode: 'contain',
},

addBtnNew: {
  alignSelf: 'center',
  borderWidth: 1.5,
  borderColor: '#ff7a00',
  borderRadius: 10,
  paddingHorizontal: 16,
  paddingVertical: 5,
  marginTop: -12,
  backgroundColor: '#fff',
  elevation: 2,
},

addText: {
  color: '#ff7a00',
  fontWeight: 'bold',
},

productName: {
  fontWeight: '600',
  marginTop: 8,
},

rating: {
  fontSize: 12,
  marginTop: 4,
},

deliveryTime: {
  color: 'green',
  fontSize: 12,
  marginTop: 3,
},

onlyLeft: {
  color: 'red',
  fontSize: 12,
},

productPrice: {
  fontWeight: 'bold',
  marginTop: 6,
  fontSize: 15,
},
priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
},

addBtnRight: {
  borderWidth: 1.5,
  borderColor: '#ff7a00',
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 4,
  backgroundColor: '#fff',
},

categoryHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: '#fff',
},

backBtn: {
  fontSize: 20,
  marginRight: 8,
},

headerCenter: {
  flex: 1,
},

categoryTitleHeader: {
  fontWeight: 'bold',
  fontSize: 16,
},

deliveryText: {
  fontSize: 12,
  color: '#ff7a00',
},

searchIcon: {
  fontSize: 20,
},

filterRow: {
  flexDirection: 'row',
  paddingHorizontal: 12,
  marginBottom: 6,
},

filterBtn: {
  backgroundColor: '#eee',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
  marginRight: 8,
},


addBtnCenter: {
  alignSelf: 'center',
  borderWidth: 1.5,
  borderColor: '#ff7a00',
  borderRadius: 10,
  paddingHorizontal: 16,
  paddingVertical: 5,
  backgroundColor: '#fff',
  marginTop: -10,
},

cartImg: {
  width: 36,
  height: 36,
  resizeMode: 'contain',
  marginRight: 10,
  borderRadius: 6,
},
cartBar: {
  position: 'absolute',
  bottom: 70,
  left: 85,
  right: 85,
  height: 60, // important
  backgroundColor: '#F7931E',
  borderRadius: 30,
  paddingHorizontal: 14,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 999,
  elevation: 10,
},


cartThumbWrap: {
  width: 46,
  height: 46,
  borderRadius: 23,
  backgroundColor: '#FFE0B2', // light orange circle
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

cartTitle: {
  color: '#1A1A1A',
  fontWeight: '600',
  fontSize: 14,
},

cartSub: {
  color: '#333',
  fontSize: 12,
  marginTop: 2,
},

cartArrowWrap: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#F57C00', // darker orange for button
  justifyContent: 'center',
  alignItems: 'center',
},

cartArrow: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
cartThumb: {
  width: 32,
  height: 32,
  resizeMode: 'contain',
  borderRadius: 6,
},




});