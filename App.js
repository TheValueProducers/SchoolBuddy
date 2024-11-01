import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {
  DopebaseProvider,
  extendTheme,
  TranslationProvider,
  ActionSheetProvider,
} from './src/core/dopebase';
import configureStore from './src/redux/store';
import AppContent from './src/AppContent';
import translations from './src/translations';
import {ConfigProvider} from './src/config';
import {AuthProvider} from './src/core/onboarding/hooks/useAuth';
import {authManager} from './src/core/onboarding/api';

import MobileTheme from './src/theme'; // Import your theme here
import {bootstrap, getNotiSets, getTriggerNotis} from './src/core/helpers/notifee';
import {fetchAgendaItems} from './src/core/users/api/backend/agenda';

const store = configureStore();

const App = () => {
  const theme = extendTheme(MobileTheme);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAgendaItems();
      } catch (error) {
        console.error('Error fetching agenda items:', error);
      }
    };
    loadData();
    getNotiSets();
    bootstrap().then().catch(console.error);
    getTriggerNotis();
    SplashScreen.hide();
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <Provider store={store}>
      <TranslationProvider translations={translations}>
        <DopebaseProvider theme={theme}>
          <ConfigProvider>
            <AuthProvider authManager={authManager}>
              <MenuProvider>
                <ActionSheetProvider>
                  <AppContent />
                </ActionSheetProvider>
              </MenuProvider>
            </AuthProvider>
          </ConfigProvider>
        </DopebaseProvider>
      </TranslationProvider>
    </Provider>
  );
};

export default App;
