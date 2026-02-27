import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

// ─── Reusable Section Title ───────────────────────────────────────────────────
const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// ─── Reusable Menu Item with divider support ──────────────────────────────────
const MenuItem = ({
  icon,
  title,
  rightText,
  isLast = false,
  onPress,
}: {
  icon: string;
  title: string;
  rightText?: string;
  isLast?: boolean;
  onPress?: () => void;
}) => (
  <>
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={19} color="#ff7a00" />
        </View>
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <View style={styles.menuRight}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        <Icon name="chevron-forward" size={18} color="#bbb" />
      </View>
    </TouchableOpacity>

    {/* Divider between items (like the Figma design) */}
    {!isLast && <View style={styles.itemDivider} />}
  </>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [lightMode, setLightMode] = useState(true);
  const { userName, userEmail } = useUser();
  const displayName = userName                               // added helper
    ? userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Guest';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Settings</Text>

          {/* Spacer to center the title */}
          <View style={{ width: 40 }} />
        </View>

        {/* ── USER CARD ── */}
        <View style={styles.userCard}>
          {/* Avatar circle matching Figma */}
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 24 }}>👤</Text>
          </View>

          <View>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{userEmail || 'No email set'}</Text>
          </View>
        </View>

        {/* ── ACCOUNT SECTION ── */}
        <SectionTitle title="ACCOUNT" />

        <View style={styles.card}>
          <MenuItem
            icon="person-outline"
            title="Profile Data"
            onPress={() => {}}
          />
          <MenuItem
            icon="card-outline"
            title="Billing & Payment"
            isLast
            onPress={() => {}}
          />
        </View>

        {/* ── SETTINGS SECTION ── */}
        <SectionTitle title="SETTINGS" />

        <View style={styles.card}>
          <MenuItem
            icon="create-outline"
            title="Account Details"
            onPress={() => {}}
          />
          <MenuItem
            icon="key-outline"
            title="Change Password"
            isLast
            onPress={() => {}}
          />
        </View>

        {/* ── PREFERENCE SECTION ── */}
        <SectionTitle title="PREFERENCE" />

        <View style={styles.card}>
          <MenuItem
            icon="globe-outline"
            title="Language"
            rightText="English"
            onPress={() => {}}
          />

          {/* Divider before switch row */}
          <View style={styles.itemDivider} />

          {/* Light Mode Toggle — matches Figma label */}
          <View style={styles.switchRow}>
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Icon name="sunny-outline" size={19} color="#ff7a00" />
              </View>
              <Text style={styles.menuText}>Light Mode</Text>
            </View>

            <Switch
              value={lightMode}
              onValueChange={setLightMode}
              trackColor={{ true: '#ff7a00', false: '#ddd' }}
              thumbColor="#fff"
              ios_backgroundColor="#ddd"
            />
          </View>
        </View>

        {/* ── LOGOUT BUTTON ── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={() => navigation.replace('Login')}
        >
          <Icon name="log-out-outline" size={18} color="#ff4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 18,
    backgroundColor: '#f5f5f5',
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },

  // ── User Card
  userCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 22,
  },

  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffe5cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#ff7a00',
  },

  userName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#ff7a00',
    marginBottom: 3,
  },

  userEmail: {
    fontSize: 13,
    color: '#888',
  },

  // ── Section Title
  sectionTitle: {
    marginHorizontal: 22,
    marginTop: 4,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1.2,
  },

  // ── Card container (groups menu items like Figma)
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },

  // ── Menu Item
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  itemDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff5ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightText: {
    marginRight: 6,
    color: '#999',
    fontSize: 13,
    fontWeight: '500',
  },

  // ── Switch Row
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  switchText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // ── Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#ffcccc',
    elevation: 2,
    gap: 8,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff4444',
  },
});