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
const SCREEN_HEIGHT = Dimensions.get('window').height;


const LoginScreen = () => {
    const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState(false);
const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo Circle */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />


      {/* Rider */}
      <Image
        source={require('../assets/delivery.png')}
        style={styles.rider}
        resizeMode="contain"
      />

      <Text style={styles.tagline}>
        Groceries, your way—pickup or delivery
      </Text>

     <View
       style={[
         styles.bottomPanel,
         { height: expanded ? SCREEN_HEIGHT * 0.55 : 230 },
       ]}
     >

        {!expanded ? (
          <>
            <Text style={styles.getStarted}>
              GET STARTED WITH FROOKOON
            </Text>

            <TouchableOpacity
              style={styles.phoneRow}
              onPress={() => setExpanded(true)}
            >
              <Text style={styles.phoneCode}>+91</Text>
            </TouchableOpacity>

            <Text style={styles.terms}>
              TERMS & CONDITIONS
            </Text>
          </>
        ) : (
          <>
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
              By Continue you agrees to T&C
            </Text>
          </>
        )}
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

termsCenter: {
  textAlign: 'center',
  fontSize: 12,
  opacity: 0.7,
  marginTop: 18,
},


  /* LOGO */
  logo: {
    width: 170,
    height: 170,
    marginTop: 30,
  },

  /* RIDER IMAGE */
  rider: {
    width: 270,
    height: 270,
    marginTop: -10,
  },


  tagline: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 12,
  },

  /* PANEL */
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



  getStarted: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },

  phoneRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF7A00',
    paddingVertical: 10,
    marginBottom: 10,
  },

  phoneCode: {
    fontSize: 16,
  },

  terms: {
    fontSize: 13,
    marginTop: 8,
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

});
