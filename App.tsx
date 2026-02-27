import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  return (

<UserProvider>
     <CartProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
        </UserProvider>
  );
};

export default App;
