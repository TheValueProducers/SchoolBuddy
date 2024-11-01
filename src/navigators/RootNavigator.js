import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoadScreen} from '../core/onboarding';
import LoginStack from './AuthStackNavigator';
import WalkthroughStackNavigator from './WalkthroughStackNavigator';
import HomeDrawer from './HomeDrawerNavigator';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="LoadScreen">
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      <Root.Screen name="WalkthroughStack" component={WalkthroughStackNavigator} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="MainStack" component={HomeDrawer} />
    </Root.Navigator>
  );
};

export default RootNavigator;
