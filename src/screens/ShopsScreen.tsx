import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShopsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shops Screen</Text>
    </View>
  );
};

export default ShopsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
