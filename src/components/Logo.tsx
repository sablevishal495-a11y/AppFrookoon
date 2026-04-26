import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = ({ size = 2000 }) => {
  return (
    <Image
      source={require('../assets/logo.png')}
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
