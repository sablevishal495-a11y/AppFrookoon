import React, { useState } from 'react';
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
  { id: '1', title: 'Atta, Rice & Dals', image: require('../assets/cat1.png') },
  { id: '2', title: 'Green Snacks & Chips', image: require('../assets/cat2.png') },
  { id: '3', title: 'Munchies & Snacks', image: require('../assets/cat3.png') },
  { id: '4', title: 'Oils, Spices & Dryfruits', image: require('../assets/cat4.png') },
  { id: '5', title: 'Cold drinks & juices', image: require('../assets/cat5.png') },
  { id: '6', title: 'Atta, Rice & Dals', image: require('../assets/cat1.png') },
];

const deals = [
  { id: '1', name: 'Brown Bread', price: '₹35', image: require('../assets/bread.png') },
  { id: '2', name: 'Coca Cola', price: '₹40', image: require('../assets/coke.png') },
  { id: '3', name: 'Cleaning Pack', price: '₹199', image: require('../assets/cleaner.png') },
  { id: '4', name: 'Oil', price: '₹135', image: require('../assets/oil.png') },
  { id: '5', name: 'Tomato', price: '₹40', image: require('../assets/tomato.png') },
  { id: '6', name: 'Cucumber', price: '₹40', image: require('../assets/cucumber.png') },
];

const HomeScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);




  return (
    <View style={styles.container}>

      {selectedCategory ? (
        <View style={{ flex: 1, padding: 1 }}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text style={{ fontSize: 16, marginBottom: 1 }}>← Back</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            {selectedCategory}
          </Text>

          <FlatList
            data={deals}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImg} />
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>

                <TouchableOpacity style={styles.addBtn}>
                  <Text style={{ color: '#ff7a00' }}>ADD</Text>
                </TouchableOpacity>
              </View>
            )}

          />

        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>

          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

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
            <Image source={require('../assets/banner.png')} style={styles.banner} resizeMode="cover" />
          </View>

          <Text style={styles.categoryTitle}>Shop & Categories</Text>

          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
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

          <Text style={styles.dealsTitle}>Top deals on bestsellers</Text>

          <FlatList
            data={deals}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 18 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <View style={styles.dealCard}>
                <Image source={item.image} style={styles.dealImg} />
                <Text style={styles.dealName} numberOfLines={2}>{item.name}</Text>
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
              <Text style={styles.popupTitle}>Device Location Not Enabled</Text>
              <Text style={styles.popupSub}>
                Enable your device location for better results
              </Text>
            </View>

            <TouchableOpacity
              style={styles.enableBtnSmall}
              onPress={() => setShowLocationPopup(false)}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Enable</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.savedTitle}>Select a Saved address</Text>

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

    {/* Tap outside closes menu */}
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={() => setMenuVisible(false)}
    />

    {/* Popup Card */}
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


      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuButtonText}>👤   Profile</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuButtonText}>📦   My Orders</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.menuButton}>
        <Text style={[styles.menuButtonText, { color: 'red' }]}>
          🔐   Log Out
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





});