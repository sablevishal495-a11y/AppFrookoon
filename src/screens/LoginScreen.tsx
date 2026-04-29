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
        source={require('../assets/logoo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.Brandname}>frookoon</Text>

      <Text style={styles.tagline}>
        Groceries, your way—pickup or delivery
      </Text>

      {/* Panel */}
      <View style={[styles.bottomPanel, { height: SCREEN_HEIGHT * 0.55 }]}>

        <Text style={styles.enterTitle}>ENTER YOUR PHONE NUMBER</Text>

        <Text style={styles.otpInfo}>WE WILL SEND YOU A 4 DIGIT OTP</Text>

        <View style={styles.inputBox}>
          {/* Indian flag */}
          <View style={styles.flagContainer}>
            <View style={styles.flagSaffron} />
            <View style={styles.flagWhite}>
              <View style={styles.ashoka} />
            </View>
            <View style={styles.flagGreen} />
          </View>
          <Text style={styles.phoneCode}>+91</Text>
          <TextInput
            style={styles.textInput}
            placeholder="XXXXXXXXXX"
            placeholderTextColor="#8AB4E8"
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

        <Text style={styles.termsCenter}>By continuing you agree to T&C</Text>

      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F5BFF',       // vibrant cobalt blue
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginTop: 42,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '600',
    color: '#BDD4FF',                  // soft cobalt-tinted white
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  Brandname: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '97%',
    backgroundColor: '#EEF3FF',        // icy cobalt-tinted white panel
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 30,
  },
  enterTitle: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    color: '#0047AB',                  // cobalt title
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  otpInfo: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#4A7FD4',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#D6E4FF',        // cobalt-washed input bg
    marginBottom: 18,
  },
  flagContainer: {
    width: 22,
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 6,
  },
  flagSaffron: { flex: 1, backgroundColor: '#FF9933' },
  flagWhite: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ashoka: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#000080',
  },
  flagGreen: { flex: 1, backgroundColor: '#138808' },
  phoneCode: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0047AB',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0A2D6E',
    fontWeight: '600',
  },
 continueBtn: {
    backgroundColor: '#FF8C00',   // orange button matching blue design
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
  },
  continueText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#99B8E8',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#5580CC',
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#99B8E8',
    elevation: 3,
    shadowColor: '#0047AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  socialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047AB',
  },
  termsCenter: {
    textAlign: 'center',
    fontSize: 12,
    color: '#5580CC',
    marginTop: 18,
  },
});