import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ─── Avatar / Emoji options ───────────────────────────────────────────────────
const AVATARS = ['🏠', '🏢', '🏫', '🏥', '🏋️', '🛒', '✈️', '❤️'];

// ─── Address type options ─────────────────────────────────────────────────────
const ADDRESS_TYPES = [
  { label: 'Home',   icon: 'home-outline'     },
  { label: 'Office', icon: 'business-outline' },
  { label: 'Other',  icon: 'location-outline' },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────
const NewAddressScreen = () => {
  const navigation = useNavigation<any>();

  const [selectedAvatar, setSelectedAvatar] = useState('🏠');
  const [addressType,    setAddressType]    = useState('Home');
  const [addressTitle,   setAddressTitle]   = useState('');
  const [fullAddress,    setFullAddress]    = useState('');
  const [landmark,       setLandmark]       = useState('');
  const [city,           setCity]           = useState('');
  const [pincode,        setPincode]        = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSaveAddress = () => {
    if (!addressTitle.trim()) {
      Alert.alert('Missing Info', 'Please enter an address title.');
      return;
    }
    if (!fullAddress.trim()) {
      Alert.alert('Missing Info', 'Please enter the full address.');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Missing Info', 'Please enter city name.');
      return;
    }

    // In a real app, save to backend / context here
    Alert.alert('✅ Address Saved', `"${addressTitle}" has been added successfully.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>NEW ADDRESS</Text>

          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Icon name="menu-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >

          {/* ── AVATAR PICKER ── */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarCircle}
              onPress={() => setShowAvatarPicker(!showAvatarPicker)}
              activeOpacity={0.8}
            >
              <Text style={styles.avatarEmoji}>{selectedAvatar}</Text>
              <View style={styles.avatarEditBadge}>
                <Icon name="camera" size={11} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowAvatarPicker(!showAvatarPicker)} activeOpacity={0.7}>
              <Text style={styles.changePicText}>Choose avatar</Text>
              <Text style={styles.changePicSub}>it can be an emoji or an image</Text>
            </TouchableOpacity>
          </View>

          {/* ── EMOJI PICKER ROW ── */}
          {showAvatarPicker && (
            <View style={styles.emojiPicker}>
              {AVATARS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.emojiBtn,
                    selectedAvatar === emoji && styles.emojiBtnActive,
                  ]}
                  onPress={() => {
                    setSelectedAvatar(emoji);
                    setShowAvatarPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* ── FORM CARD ── */}
          <View style={styles.formCard}>

            {/* Address Type */}
            <Text style={styles.fieldLabel}>ADDRESS TYPE</Text>
            <View style={styles.typeRow}>
              {ADDRESS_TYPES.map(({ label, icon }) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.typeBtn, addressType === label && styles.typeBtnActive]}
                  onPress={() => {
                    setAddressType(label);
                    setAddressTitle(label);
                  }}
                  activeOpacity={0.8}
                >
                  <Icon name={icon} size={15} color={addressType === label ? '#fff' : '#ff7a00'} />
                  <Text style={[styles.typeBtnText, addressType === label && { color: '#fff' }]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Address Title */}
            <Text style={styles.fieldLabel}>ADDRESS TITLE</Text>
            <View style={styles.inputBox}>
              <Icon name="bookmark-outline" size={18} color="#bbb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={addressTitle}
                onChangeText={setAddressTitle}
                placeholder="e.g. Home, Mom's place..."
                placeholderTextColor="#bbb"
              />
            </View>

            {/* Full Address */}
            <Text style={styles.fieldLabel}>FULL ADDRESS</Text>
            <View style={[styles.inputBox, styles.inputBoxTall]}>
              <Icon name="location-outline" size={18} color="#bbb" style={[styles.inputIcon, { marginTop: 2 }]} />
              <TextInput
                style={[styles.input, { height: 64, textAlignVertical: 'top' }]}
                value={fullAddress}
                onChangeText={setFullAddress}
                placeholder="House no, Street, Area..."
                placeholderTextColor="#bbb"
                multiline
              />
            </View>

            {/* Landmark */}
            <Text style={styles.fieldLabel}>LANDMARK (Optional)</Text>
            <View style={styles.inputBox}>
              <Icon name="flag-outline" size={18} color="#bbb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={landmark}
                onChangeText={setLandmark}
                placeholder="Near school, temple, mall..."
                placeholderTextColor="#bbb"
              />
            </View>

            {/* City + Pincode row */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>CITY</Text>
                <View style={styles.inputBox}>
                  <Icon name="business-outline" size={18} color="#bbb" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                    placeholderTextColor="#bbb"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>PINCODE</Text>
                <View style={styles.inputBox}>
                  <Icon name="keypad-outline" size={18} color="#bbb" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={pincode}
                    onChangeText={setPincode}
                    placeholder="000000"
                    placeholderTextColor="#bbb"
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
              </View>
            </View>

          </View>

          {/* ── MAP PLACEHOLDER ── */}
          <View style={styles.mapSection}>
            <Text style={styles.fieldLabel} style={styles.mapLabel}>CHOOSE LOCATION</Text>
            <View style={styles.mapBox}>
              {/* Fake map grid lines for visual effect */}
              <View style={styles.mapGrid}>
                {[...Array(5)].map((_, i) => (
                  <View key={`h${i}`} style={[styles.gridLine, styles.gridLineH, { top: `${i * 25}%` }]} />
                ))}
                {[...Array(5)].map((_, i) => (
                  <View key={`v${i}`} style={[styles.gridLine, styles.gridLineV, { left: `${i * 25}%` }]} />
                ))}
              </View>

              {/* Pin marker in center */}
              <View style={styles.mapPin}>
                <View style={styles.mapPinDot} />
                <View style={styles.mapPinShadow} />
              </View>

              <Text style={styles.mapPlaceholderText}>Map View</Text>
              <Text style={styles.mapPlaceholderSub}>Integrate react-native-maps here</Text>
            </View>
          </View>

          {/* ── USE CURRENT LOCATION ── */}
          <TouchableOpacity style={styles.locationBtn} activeOpacity={0.8}>
            <View style={styles.locationIconWrap}>
              <Icon name="navigate" size={20} color="#ff7a00" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.locationBtnTitle}>Use my current location</Text>
              <Text style={styles.locationBtnSub}>Auto-fill address from GPS</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ff7a00" />
          </TouchableOpacity>

          {/* ── BUTTONS ── */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveAddress}
              activeOpacity={0.8}
            >
              <Icon name="save-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.saveBtnText}>SAVE ADDRESS</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewAddressScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 1,
  },

  // Avatar section
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff5ee',
    borderWidth: 2,
    borderColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarEmoji: { fontSize: 34 },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePicText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff7a00',
  },
  changePicSub: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 3,
  },

  // Emoji picker
  emojiPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  emojiBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#eee',
  },
  emojiBtnActive: {
    borderColor: '#ff7a00',
    backgroundColor: '#fff5ee',
  },
  emojiText: { fontSize: 24 },

  // Form card
  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1.1,
    marginBottom: 8,
    marginTop: 4,
  },

  // Address type selector
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    backgroundColor: '#fff',
  },
  typeBtnActive: { backgroundColor: '#ff7a00' },
  typeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ff7a00',
  },

  // Input
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fafafa',
    borderRadius: 13,
    paddingHorizontal: 13,
    borderWidth: 1.5,
    borderColor: '#eee',
    marginBottom: 14,
  },
  inputBoxTall: {
    height: 88,
    alignItems: 'flex-start',
    paddingTop: 14,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },

  // Map
  mapSection: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  mapLabel: {
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  mapBox: {
    height: 180,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#e8e8e8',
  },
  gridLineH: {
    left: 0, right: 0, height: 1,
  },
  gridLineV: {
    top: 0, bottom: 0, width: 1,
  },
  mapPin: {
    alignItems: 'center',
    marginBottom: 8,
  },
  mapPinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff7a00',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 4,
  },
  mapPinShadow: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginTop: 2,
  },
  mapPlaceholderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#bbb',
  },
  mapPlaceholderSub: {
    fontSize: 11,
    color: '#ccc',
    marginTop: 4,
  },

  // Current location button
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ffe0c4',
    elevation: 2,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  locationIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#fff5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBtnTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff7a00',
  },
  locationBtnSub: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },

  // Bottom buttons
  btnRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
  },
  saveBtn: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#ff7a00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
});