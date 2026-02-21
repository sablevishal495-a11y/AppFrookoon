import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- HEADER ---------- */}
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.cartCircle}
            onPress={() => navigation.navigate('Cart')}
          >
            <Icon name="cart-outline" size={20} color="#ff7a00" />
          </TouchableOpacity>
        </View>


        {/* ---------- PROFILE INFO ---------- */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 38 }}>👤</Text>
          </View>

          <Text style={styles.name}>Amit Patel</Text>
          <Text style={styles.email}>amitpatel@gmail.com</Text>
        </View>

        {/* ---------- QUICK ACTIONS ---------- */}
        <View style={styles.quickRow}>
          <QuickButton icon="notifications-outline" label="Notification" />
          <QuickButton icon="pricetag-outline" label="Voucher" />
          <QuickButton icon="time-outline" label="History" />
        </View>

        {/* ---------- MENU ITEMS ---------- */}
        <MenuItem
          icon="create-outline"
          title="Edit Profile"
        />

        <MenuItem
          icon="location-outline"
          title="Address Management"
        />

        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
        />

        <MenuItem
          icon="log-out-outline"
          title="Log Out"
          danger
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const QuickButton = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => (
  <TouchableOpacity style={styles.quickButton}>
    <Icon name={icon} size={22} color="#ff7a00" />
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);
const MenuItem = ({
  icon,
  title,
  danger = false,
}: {
  icon: string;
  title: string;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Icon
        name={icon}
        size={22}
        color={danger ? 'red' : '#ff7a00'}
      />
      <Text
        style={[
          styles.menuText,
          danger && { color: 'red' },
        ]}
      >
        {title}
      </Text>
    </View>

    <Icon name="chevron-forward" size={22} color="#999" />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 40,   // 👈 more top spacing
  paddingBottom: 10,
},

headerTitle: {
  fontSize: 22,
  fontWeight: '900',   // 👈 more bold
  letterSpacing: 0.5,
},
cartCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 4,
},

  profileSection: {
    alignItems: 'center',
    marginTop: 10,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    color: '#ff7a00',
  },

  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 24,
  },

  quickButton: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },

  quickLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },

  menuItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
  },
});
