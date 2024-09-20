import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import Checkout from './views/Checkout';
import { StripeContainer } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeContainer publishableKey={'pk_test_51PsufjDZeVBZEKvU1jBsPqTkiHXupx4favgCVuEn764flV0fCdcDwGVibn08F3LWtqJFusEGsOCLmemt97duzJ6t00aGK8KzyG'}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeContainer>
  );
}