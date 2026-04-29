import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoScale      = useRef(new Animated.Value(0.7)).current;
  const textOpacity    = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    // Phase 1: Logo fades + springs in
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Phase 2: Brand name + tagline slide up after logo settles
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Navigate to Login after everything is done
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.group}>

        <Animated.Image
          source={require('../assets/logoo.png')}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
          resizeMode="contain"
        />

        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.brand}>frookoon</Text>
          <Text style={styles.tagline}>
            Groceries, your way—pickup or delivery
          </Text>
        </Animated.View>

      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F5BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  group: {
    alignItems: 'center',
    marginTop: -height * 0.05,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});