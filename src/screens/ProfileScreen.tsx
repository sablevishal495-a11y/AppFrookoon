import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

// ─── Sub-components OUTSIDE the main component ───────────────────────────────
// This is critical — keeping them outside prevents the hooks order error

const QuickButton = ({ icon, label }: { icon: string; label: string }) => (
  <TouchableOpacity style={styles.quickButton}>
    <Icon name={icon} size={22} color="#ff7a00" />
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const MenuItem = ({
  icon,
  title,
  danger = false,
  onPress,
}: {
  icon: string;
  title: string;
  danger?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={22} color={danger ? 'red' : '#ff7a00'} />
      <Text style={[styles.menuText, danger && { color: 'red' }]}>
        {title}
      </Text>
    </View>
    <Icon name="chevron-forward" size={22} color="#999" />
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ProfileScreen = () => {
  // ✅ ALL hooks must be at the very top, no exceptions
  const navigation = useNavigation<any>();
  const { userName, userEmail } = useUser();

  // Capitalize each word
  const displayName = userName
    ? userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Guest';

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.cartCircle}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings-outline" size={20} color="#ff7a00" />
          </TouchableOpacity>
        </View>

        {/* PROFILE INFO */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 38 }}>👤</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{userEmail || 'No email set'}</Text>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickRow}>
          <QuickButton icon="notifications-outline" label="Notification" />
          <QuickButton icon="pricetag-outline" label="Voucher" />
          <QuickButton icon="time-outline" label="History" />
        </View>

        {/* MENU ITEMS */}
        <MenuItem icon="create-outline"      title="Edit Profile" />
        <MenuItem icon="location-outline"    title="Address Management" />
        <MenuItem icon="help-circle-outline" title="Help & Support" />

        {/* ✅ Logout — redirects to Login */}
        <MenuItem
          icon="log-out-outline"
          title="Log Out"
          danger
          onPress={handleLogout}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
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
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
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