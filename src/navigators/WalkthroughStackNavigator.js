import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { WalkthroughScreen } from '../core/onboarding';
import React from 'react';

const WalkthroughStack = createStackNavigator();

const WalkthroughStackNavigator = () => {
  return (
    <WalkthroughStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Walkthrough"
    >
      <WalkthroughStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />

    </WalkthroughStack.Navigator>
  )
};

export default WalkthroughStackNavigator;
