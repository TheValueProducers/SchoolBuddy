import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { useOnboardingConfig } from '../../core/onboarding/hooks/useOnboardingConfig';
import {
  useTheme,
  useTranslations,
  View,
  ActivityIndicator,
  TouchableIcon,
  Dialog,
  Text,
} from '../../core/dopebase';
import dynamicStyles from './styles';

import menuIcon from '../../assets/icons/menu1x.png';
import { AgendaCustom } from '../../core/dopebase/core/components/advanced/Calendar';

export const CalendarResult = memo(props => {
  const { navigation } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const { hideDialog, dialogData, dialogRef } = useOnboardingConfig();

  const [isLoading, setIsLoading] = useState(true);

  const _renderHeaderLeft = useCallback(
    () => (
      <View>
        <TouchableIcon
          imageStyle={{ tintColor: colorSet.secondaryText }}
          iconSource={theme.icons.backArrow}
          onPress={() => navigation.goBack()}
        />
      </View>
    ),
    [],
  );

  const _renderHeaderRight = useCallback(
    () => (
      <View>
        <TouchableIcon
          imageStyle={{ tintColor: colorSet.thirBackground }}
          iconSource={menuIcon}
          onPress={() => navigation.openDrawer()}
        />
      </View>
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: localized('Calendar'),
      headerTitleAlign: 'center',
      headerLeft: _renderHeaderLeft,
      headerRight: _renderHeaderRight,
      headerStyle: styles.headerStyle,
      headerTintColor: colorSet.secondaryText,
    });
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View fx1 style={{ backgroundColor: colorSet.primaryBackground }}>
        <View
          ph5
          pv5
          style={[
            styles.flexRow,
            { alignItems: 'center', justifyContent: 'space-between' },
          ]}>
          <Text style={{ fontWeight: '700', color: colorSet.thirBackground }}>
            11A
          </Text>
          <View
            style={[
              styles.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'space-around',
                columnGap: width * 0.02,
              },
            ]}>
            <Text style={{ color: colorSet.secondaryText }}>Từ</Text>
            <Button mode="outlined" textColor={colorSet.secondaryText}>
              Tháng 7
            </Button>
            <Text style={{ color: colorSet.secondaryText }}>đến</Text>
            <Button mode="outlined" textColor={colorSet.secondaryText}>
              Tháng 9
            </Button>
          </View>
          <Text style={{ color: colorSet.secondaryText, fontWeight: '800' }}>
            /2024
          </Text>
        </View>
        <View fx1>
          <AgendaCustom {...props} />
        </View>
        <Dialog
          ref={dialogRef}
          title={dialogData?.title || 'Dialog Title'}
          message={dialogData?.message || 'This is a message in the dialog.'}
          actions={[
            {
              title: 'Cancel',
              onPress: hideDialog,
              secondary: true,
            },
            {
              title: 'OK',
              onPress: hideDialog,
            },
          ]}
          titleStyle={{
            fontSize: width * 0.05,
          }}
          messageStyle={
            {
              // alignSelf: 'flex-start',
            }
          }
        />
      </View>
    );
  }
});

const { width, height } = Dimensions.get('window');
