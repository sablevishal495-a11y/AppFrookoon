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
import { useUser } from '../context/UserContext';

// ─── Reusable Input Field ─────────────────────────────────────────────────────
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  icon,
}: {
  label: string;
  value: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  icon: string;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={fieldStyles.wrap}>
      <Text style={fieldStyles.label}>{label}</Text>
      <View style={[
        fieldStyles.box,
        focused && fieldStyles.boxFocused,
        !editable && fieldStyles.boxDisabled,
      ]}>
        <Icon
          name={icon}
          size={18}
          color={focused ? '#ff7a00' : '#bbb'}
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={[fieldStyles.input, !editable && { color: '#aaa' }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {editable && value.length > 0 && onChangeText && (
          <TouchableOpacity onPress={() => onChangeText('')} activeOpacity={0.7}>
            <Icon name="close-circle" size={16} color="#ddd" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const EditProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { userName, userEmail, saveUser } = useUser();

  // Pre-fill fields with current context values
  const [name,            setName]            = useState(userName || '');
  const [email,           setEmail]           = useState(userEmail || '');
  const [phone,           setPhone]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass,        setShowPass]        = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [saved,           setSaved]           = useState(false);

  const handleSave = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }
    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // ✅ Save name + email to global context — updates HomeScreen, Settings, Profile instantly
    saveUser(name.trim(), email.trim());

    // Show saved confirmation then go back
    setSaved(true);
    setTimeout(() => {
      navigation.goBack();
    }, 800);
  };

  const handleCancel = () => navigation.goBack();

  // Capitalize display name
  const initials = name
    ? name.split(' ').map(w => w[0]?.toUpperCase()).join('').slice(0, 2)
    : '👤';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >

          {/* ── HEADER ── */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Icon name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>EDIT PROFILE</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* ── AVATAR ── */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
              {/* Orange ring */}
              <View style={styles.avatarRing} />
            </View>

            <TouchableOpacity style={styles.changePicBtn} activeOpacity={0.7}>
              <Icon name="camera-outline" size={14} color="#ff7a00" />
              <Text style={styles.changePicText}>Change Picture</Text>
            </TouchableOpacity>
          </View>

          {/* ── FORM ── */}
          <View style={styles.form}>

            <InputField
              label="NAME"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              icon="person-outline"
            />

            <InputField
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              icon="mail-outline"
            />

            <InputField
              label="PHONE NUMBER"
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 - XXXXXXXXXX"
              keyboardType="phone-pad"
              icon="call-outline"
            />

            {/* Password row with show/hide */}
            <View style={fieldStyles.wrap}>
              <Text style={fieldStyles.label}>PASSWORD</Text>
              <View style={fieldStyles.box}>
                <Icon name="lock-closed-outline" size={18} color="#bbb" style={{ marginRight: 10 }} />
                <TextInput
                  style={fieldStyles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#bbb"
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} activeOpacity={0.7}>
                  <Icon name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#bbb" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={fieldStyles.wrap}>
              <Text style={fieldStyles.label}>RETYPE PASSWORD</Text>
              <View style={[
                fieldStyles.box,
                confirmPassword.length > 0 && password !== confirmPassword && fieldStyles.boxError,
                confirmPassword.length > 0 && password === confirmPassword && fieldStyles.boxSuccess,
              ]}>
                <Icon name="lock-open-outline" size={18} color="#bbb" style={{ marginRight: 10 }} />
                <TextInput
                  style={fieldStyles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Retype new password"
                  placeholderTextColor="#bbb"
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} activeOpacity={0.7}>
                  <Icon name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={18} color="#bbb" />
                </TouchableOpacity>
              </View>
              {/* Password match indicator */}
              {confirmPassword.length > 0 && (
                <Text style={[
                  styles.matchText,
                  { color: password === confirmPassword ? '#22a55b' : '#e53935' }
                ]}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </Text>
              )}
            </View>

          </View>

          {/* ── BUTTONS ── */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, saved && styles.saveBtnSuccess]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Icon
                name={saved ? 'checkmark-circle' : 'save-outline'}
                size={16}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.saveText}>{saved ? 'Saved!' : 'Save'}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;

// ─── Input Field Styles ───────────────────────────────────────────────────────
const fieldStyles = StyleSheet.create({
  wrap: { marginBottom: 18 },

  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 1.1,
    marginBottom: 8,
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#eee',
  },

  boxFocused: { borderColor: '#ff7a00', backgroundColor: '#fff' },
  boxDisabled: { backgroundColor: '#f5f5f5', borderColor: '#eee' },
  boxError:   { borderColor: '#e53935' },
  boxSuccess: { borderColor: '#22a55b' },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 1,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 28,
  },

  avatarWrap: {
    position: 'relative',
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },

  avatarRing: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 98,
    height: 98,
    borderRadius: 49,
    borderWidth: 3,
    borderColor: '#ff7a00',
    zIndex: 0,
  },

  changePicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ff7a00',
    backgroundColor: '#fff9f5',
  },

  changePicText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ff7a00',
  },

  // Form
  form: {
    paddingHorizontal: 20,
  },

  matchText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 4,
  },

  // Buttons
  btnRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
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
    fontSize: 15,
    fontWeight: '700',
    color: '#888',
  },

  saveBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#ff7a00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  saveBtnSuccess: {
    backgroundColor: '#22a55b',
  },

  saveText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
});