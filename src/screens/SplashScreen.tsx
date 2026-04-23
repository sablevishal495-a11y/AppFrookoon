import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    // Step 1: Logo fades + scales in
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
      // Step 2: Text slides up and fades in after logo settles
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

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centerGroup}>
        {/* Logo icon — replace with your actual logo image */}
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
          resizeMode="contain"
        />

        {/* Brand name */}
        <Animated.Text
          style={[
            styles.brandText,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          Frookoon
        </Animated.Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D4EF5', // the blue from the video
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerGroup: {
    alignItems: 'center',
    marginTop: height * 0.08, // nudges the group slightly below true center, matching the video
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});