import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import {OnboardingConfigProvider} from './core/onboarding/hooks/useOnboardingConfig';
import {useConfig} from './config';

const AppContent = () => {
  const config = useConfig();

  return (
    <OnboardingConfigProvider config={config}>
      <StatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </OnboardingConfigProvider>
  );
};

export default AppContent;
