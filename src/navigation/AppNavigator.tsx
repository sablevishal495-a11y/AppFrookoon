import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import CreateAccountScreen from "../screens/CreateAccountScreen";
import LocationScreen from '../screens/LocationScreen';
import BottomTabs from './BottomTabs';
import CheckoutScreen from '../screens/CheckoutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddressManagementScreen from '../screens/AddressManagementScreen';
import NewAddressScreen from '../screens/NewAddressScreen';
import StoreDetailsScreen from '../screens/StoreDetailsScreen';




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
<Stack.Screen name="MyOrders" component={MyOrdersScreen} />
<Stack.Screen name="EditProfile" component={EditProfileScreen} />
<Stack.Screen name="AddressManagement" component={AddressManagementScreen} />
       <Stack.Screen name="Checkout" component={CheckoutScreen} />
       <Stack.Screen name="NewAddress" component={NewAddressScreen} />


<Stack.Screen
  name="PaymentSuccess"
  component={PaymentSuccessScreen}
  options={{
    presentation: 'modal',
    animation: 'slide_from_bottom',
  }}
/>

    </Stack.Navigator>
  );
};

export default AppNavigator;