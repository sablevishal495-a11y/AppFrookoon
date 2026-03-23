import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

// ─── Sub-components ───────────────────────────────────────────────────────────
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
      <View style={[styles.menuIconBox, danger && { backgroundColor: '#fdecea' }]}>
        <Icon name={icon} size={20} color={danger ? '#e53935' : '#ff7a00'} />
      </View>
      <Text style={[styles.menuText, danger && { color: '#e53935' }]}>{title}</Text>
    </View>
    <Icon name="chevron-forward" size={18} color="#ccc" />
  </TouchableOpacity>
);

// ─── Logout Modal ─────────────────────────────────────────────────────────────
const LogoutModal = ({
  visible,
  onClose,
  onLogoutCurrent,
  onLogoutAll,
}: {
  visible: boolean;
  onClose: () => void;
  onLogoutCurrent: () => void;
  onLogoutAll: () => void;
}) => {
  const slideAnim  = useRef(new Animated.Value(300)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(0.85)).current;
  const iconAnim   = useRef(new Animated.Value(0)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Backdrop fade in
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
      // Card slide up + scale
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 65, friction: 11, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 65, friction: 11, useNativeDriver: true }),
      ]).start();
      // Icon bounce in with rotation
      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(iconAnim,   { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
          Animated.timing(iconRotate, { toValue: 1, duration: 400, useNativeDriver: true }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }),
      ]).start();
      iconAnim.setValue(0);
      iconRotate.setValue(0);
    }
  }, [visible]);

  const iconSpin = iconRotate.interpolate({ inputRange: [0, 1], outputRange: ['-20deg', '0deg'] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[modalStyles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <Animated.View style={[
          modalStyles.card,
          { transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
        ]}>

          {/* ── Decorative top gradient bar ── */}
          <View style={modalStyles.topBar}>
            <View style={[modalStyles.topBarSegment, { backgroundColor: '#ff7a00', flex: 2 }]} />
            <View style={[modalStyles.topBarSegment, { backgroundColor: '#e53935', flex: 1 }]} />
          </View>

          {/* ── Animated icon ── */}
          <Animated.View style={[
            modalStyles.iconOuter,
            {
              transform: [
                { scale: iconAnim },
                { rotate: iconSpin },
              ],
            },
          ]}>
            <View style={modalStyles.iconInner}>
              <View style={modalStyles.iconRing} />
              <Icon name="log-out-outline" size={30} color="#e53935" />
            </View>
          </Animated.View>

          {/* ── Title ── */}
          <Text style={modalStyles.title}>Leaving so soon?</Text>
          <Text style={modalStyles.subtitle}>
            Choose how you'd like to sign out of your Frookoon account
          </Text>

          {/* ── Options ── */}
          <View style={modalStyles.optionsWrap}>

            {/* This Device */}
            <TouchableOpacity
              style={modalStyles.optionCard}
              onPress={onLogoutCurrent}
              activeOpacity={0.85}
            >
              <View style={[modalStyles.optionIconWrap, { backgroundColor: '#fff5ee' }]}>
                <Icon name="phone-portrait" size={22} color="#ff7a00" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={modalStyles.optionTitle}>This Device</Text>
                <Text style={modalStyles.optionSub}>Log out from this phone only</Text>
              </View>
              <View style={[modalStyles.optionArrow, { backgroundColor: '#fff5ee' }]}>
                <Icon name="arrow-forward" size={14} color="#ff7a00" />
              </View>
            </TouchableOpacity>

            {/* All Devices */}
            <TouchableOpacity
              style={[modalStyles.optionCard, modalStyles.optionCardDanger]}
              onPress={onLogoutAll}
              activeOpacity={0.85}
            >
              <View style={[modalStyles.optionIconWrap, { backgroundColor: '#fdecea' }]}>
                <Icon name="layers" size={22} color="#e53935" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[modalStyles.optionTitle, { color: '#e53935' }]}>All Devices</Text>
                <Text style={modalStyles.optionSub}>Sign out everywhere at once</Text>
              </View>
              <View style={[modalStyles.optionArrow, { backgroundColor: '#fdecea' }]}>
                <Icon name="arrow-forward" size={14} color="#e53935" />
              </View>
            </TouchableOpacity>

          </View>

          {/* ── Cancel ── */}
          <TouchableOpacity
            style={modalStyles.cancelBtn}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Icon name="close" size={16} color="#999" style={{ marginRight: 6 }} />
            <Text style={modalStyles.cancelText}>Cancel, keep me logged in</Text>
          </TouchableOpacity>

        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { userName, userEmail } = useUser();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const displayName = userName
    ? userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Guest';

  const handleLogoutCurrent = () => {
    setLogoutModalVisible(false);
    setTimeout(() => navigation.replace('Login'), 250);
  };

  const handleLogoutAll = () => {
    setLogoutModalVisible(false);
    setTimeout(() => navigation.replace('Login'), 250);
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
          {/* Avatar with orange ring */}
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 38 }}>👤</Text>
            </View>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{userEmail || 'No email set'}</Text>

          {/* Member badge */}
          <View style={styles.memberBadge}>
            <Icon name="star" size={11} color="#ff7a00" />
            <Text style={styles.memberText}>Frookoon Member</Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickRow}>
          <QuickButton icon="notifications-outline" label="Notification" />
          <QuickButton icon="pricetag-outline"      label="Voucher"       />
          <QuickButton icon="time-outline"           label="History"       />
        </View>

        {/* MENU ITEMS */}
        <View style={styles.menuSection}>
          <MenuItem
            icon="create-outline"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="location-outline"
            title="Address Management"
            onPress={() => navigation.navigate('AddressManagement')}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => navigation.navigate('HelpSupport')}
          />
        </View>

        {/* LOGOUT BUTTON — styled separately */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutModalVisible(true)}
          activeOpacity={0.8}
        >
          <Icon name="log-out-outline" size={20} color="#e53935" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onLogoutCurrent={handleLogoutCurrent}
        onLogoutAll={handleLogoutAll}
      />
    </View>
  );
};

export default ProfileScreen;

// ─── Modal Styles ─────────────────────────────────────────────────────────────
const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    width: '100%',
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
  },

  // Coloured bar at very top
  topBar: {
    flexDirection: 'row',
    height: 5,
  },
  topBarSegment: {
    height: '100%',
  },

  // Animated icon
  iconOuter: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fdecea',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#e5393520',
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  // Options
  optionsWrap: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 14,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
  },
  optionCardDanger: {
    borderColor: '#fdecea',
    backgroundColor: '#fffafa',
  },
  optionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  optionSub: {
    fontSize: 12,
    color: '#aaa',
  },
  optionArrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cancel
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
  cartCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    elevation: 4,
  },

  profileSection: { alignItems: 'center', marginTop: 10 },

  // Avatar with glowing ring
  avatarRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 3,
    borderColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  avatar: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: { fontSize: 20, fontWeight: '800', marginTop: 12, color: '#1a1a1a' },
  email: { fontSize: 14, color: '#888', marginTop: 4 },

  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff5ee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffd4a8',
  },
  memberText: { fontSize: 12, fontWeight: '700', color: '#ff7a00' },

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
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  quickLabel: { marginTop: 6, fontSize: 12, fontWeight: '600', color: '#444' },

  menuSection: { marginTop: 20 },

  menuItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  menuLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIconBox: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: '#fff5ee',
    justifyContent: 'center', alignItems: 'center',
  },
  menuText: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },

  // Standalone logout button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 8,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffd0ce',
    elevation: 2,
    shadowColor: '#e53935',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#e53935' },
});