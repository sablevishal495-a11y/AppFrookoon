import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OTPScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const phone = route.params?.phone || '';
  const [timer, setTimer] = useState(28);

   useEffect(() => {
     if (timer === 0) return;

     const interval = setInterval(() => {
       setTimer((prev) => prev - 1);
     }, 1000);

     return () => clearInterval(interval);
   }, [timer]);


  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);

  const inputs = useRef<any[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 45 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.title}>Verify OTP</Text>

      <Text>Send To +91-{phone}</Text>

      {/* OTP Boxes */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.otpBox,
              error && styles.otpErrorBox, // red style on error
            ]}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(val) => handleChange(val, index)}
          />
        ))}
      </View>

      {/* Error message */}
      {error && (
        <Text style={styles.errorText}>
          Incorrect OTP Try Again
        </Text>
      )}

     <TouchableOpacity
       disabled={timer !== 0}
       onPress={() => {
         setTimer(28); // reset timer
       }}
     >
       <Text style={styles.resend}>
         {timer === 0 ? (
           <Text style={{ color: '#ff7a00' }}>Resend OTP</Text>
         ) : (
           <>
             Resend OTP in{' '}
             <Text style={{ color: '#ff7a00' }}>
               00:{timer.toString().padStart(2, '0')}
             </Text>
           </>
         )}
       </Text>
     </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.verifyBtn,
          error && { backgroundColor: '#bbb' },
        ]}
        onPress={() => {
          const enteredOtp = otp.join('');

          if (enteredOtp === '1234') {
            navigation.replace('CreateAccount');
          } else {
            setError(true);
          }
        }}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.change}>Change Number</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    alignItems: 'center',
  },

  back: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  header: {
    color: '#ff7a00',
    fontWeight: 'bold',
    marginTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
  },

  otpRow: {
    flexDirection: 'row',
    marginTop: 40,
  },

  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },

  otpErrorBox: {
    backgroundColor: '#ffb3b3',
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    marginTop: 15,
    fontWeight: '600',
  },

  resend: {
    marginTop: 30,
    fontSize: 15,
  },

  verifyBtn: {
    backgroundColor: '#2DBE60',
    marginTop: 40,
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  change: {
    marginTop: 20,
    color: '#2DBE60',
    fontSize: 16,
  },
});
