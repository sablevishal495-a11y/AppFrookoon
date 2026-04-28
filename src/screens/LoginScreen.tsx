import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const LoginScreen = () => {
const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const { saveUser } = useUser();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.tagline}>
        Groceries, your way—pickup or delivery
      </Text>

      {/* Panel — always fully open */}
      <View style={[styles.bottomPanel, { height: SCREEN_HEIGHT * 0.55 }]}>

        <Text style={styles.enterTitle}>
          ENTER YOUR PHONE NUMBER
        </Text>

        <Text style={styles.otpInfo}>
          WE WILL SEND YOU A 4 DIGIT OTP
        </Text>

        <View style={styles.inputBox}>
          <Text style={styles.phoneCode}>+91</Text>
          <TextInput
            style={{ flex: 1, marginLeft: 8 }}
            placeholder="XXXXXXXXXX"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => {
            if (phone.length !== 10) {
              Alert.alert('Invalid Number', 'Please enter your phone number');
              return;
            }
            saveUser(undefined, undefined, phone);
            navigation.navigate('OTP', { phone });
          }}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialText}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialText}>✉</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsCenter}>
          By continuing you agree to T&C
        </Text>

      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5BE63',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginTop: 42,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 45,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '97%',
    backgroundColor: '#ECECEC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 30,
  },
  enterTitle: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
    color: '#FF7A00',
    marginBottom: 8,
  },
  otpInfo: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5c27a',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#f2e1b6',
    marginBottom: 18,
  },
  phoneCode: {
    fontSize: 16,
  },
  continueBtn: {
    backgroundColor: '#2DBE60',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    opacity: 0.7,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  socialText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsCenter: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 18,
  },
});