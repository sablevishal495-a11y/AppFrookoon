import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const menuItems = [
    { title: 'My Profile', icon: 'person-outline' },
    { title: 'My Orders', icon: 'cube-outline' },
    { title: 'Change Language', icon: 'language-outline' },
    { title: 'Online Ordering Help', icon: 'help-circle-outline' },
  ];

  return (
    <View style={styles.container}>

      {/* ---------------- HEADER SECTION ---------------- */}
      <View style={styles.header}>

        {/* Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Icon name="person" size={40} color="#fff" />
        </View>

        <Text style={styles.userName}>Amit Patel</Text>
        <Text style={styles.phone}>+91-XXXXXXXXXX</Text>
      </View>

      {/* ---------------- WHITE CARD SECTION ---------------- */}
      <View style={styles.cardContainer}>
        <Text style={styles.sectionTitle}>Account Overview</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuCard}>

            <View style={styles.menuLeft}>
              <View style={styles.iconCircle}>
                <Icon name={item.icon} size={20} color="#ff8c00" />
              </View>

              <Text style={styles.menuText}>{item.title}</Text>
            </View>

            <View style={styles.arrowCircle}>
              <Icon name="chevron-forward" size={18} color="#000" />
            </View>

          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5c77c',
  },

  /* HEADER */
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 60,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff8c00',
  },

  phone: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },

  /* CARD SECTION */
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },

  menuCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff2e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600',
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
