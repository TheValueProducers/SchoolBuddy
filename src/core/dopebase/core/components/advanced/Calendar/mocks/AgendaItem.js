import isEmpty from 'lodash/isEmpty';
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
  Animated,
} from 'react-native';
import {View} from '../../../base/View';
import {Text} from '../../../base/Text';
import {Switch} from '../../../base/Switch';
import {useTheme} from '../../../../theming';
import {useOnboardingConfig} from '../../../../../../onboarding/hooks/useOnboardingConfig';
import {
  getTimeDifference,
  getTimeFuture,
} from '../../../../../../helpers/timeFormat';
import {
  cancelNotification,
  onCreateTriggerNotification,
} from '../../../../../../helpers/notifee';

const AgendaItem = ({item, date, switchActive, updateNotiState}) => {
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(colorSet);
  const {showDialog} = useOnboardingConfig();
  const [noti, setNoti] = useState(item.notiState || null);
  const prevNotiRef = useRef(noti);
  const [switchShow, setSwitchShow] = useState(true);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isEmpty(item)) {
      return;
    }
    if (noti && !prevNotiRef.current) {
      onCreateTriggerNotification(item.title, date, item.hour);
      updateNotiState(date, item.hour, noti);
    } else if (!noti && prevNotiRef.current) {
      cancelNotification(`LMSystem_${date}_${item.hour}`);
      updateNotiState(date, item.hour, noti);
    } else if (prevNotiRef.current && noti) {
      onCreateTriggerNotification(item.title, date, item.hour);
    }
    prevNotiRef.current = noti;
  }, [noti]);

  useEffect(() => {
    if (date < new Date().toISOString().split('T')[0]) {
      setSwitchShow(false);
    }
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [blinkAnim]);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title, item.class, [{}]);
  }, [item.title]);

  const blinkActive = useMemo(() => {
    if (isEmpty(item)) {
      return false;
    }
    return getTimeDifference(date, item.hour, 60);
  }, [date, item.hour]);

  const switchDisabled = useMemo(() => {
    if (isEmpty(item)) {
      return false;
    }
    return !getTimeFuture(date, item.hour);
  }, [date, item.hour]);

  const handleShowDialog = () => {
    showDialog({
      title: item.title,
      message: `${item.class} - ${item.duration}`,
    });
    console.log(`Điều hướng đến đánh giá`)
  };

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleShowDialog}
      style={[
        styles.item,
        blinkActive
          ? {
              backgroundColor: blinkAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255,0,0,0.2)', 'rgba(255,0,0,0.8)'],
              }),
            }
          : {},
      ]}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <View ml3 style={styles.itemTitle}>
        <Text h4 bold style={styles.itemTitleText} numberOfLines={1}>
          {item.title}
        </Text>
        <Text>{item.class}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        {switchActive && !switchDisabled ? (
          <Switch
            value={item.notiState}
            onToggleSwitch={setNoti}
            disabled={switchDisabled}
          />
        ) : (
          <View>
            <Button color={'grey'} title={'Info'} onPress={itemPressed} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(AgendaItem);

const dynamicStyles = function (colorSet) {
  return StyleSheet.create({
    item: {
      padding: 20,
      backgroundColor: colorSet.primaryBackground,
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey9,
      flexDirection: 'row',
      position: 'relative',
    },
    itemHourText: {
      color: colorSet.primaryText,
    },
    itemDurationText: {
      color: colorSet.secondaryText,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    itemTitle: {
      maxWidth: '70%',
    },
    itemTitleText: {
      color: colorSet.primaryText,
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey9,
    },
    emptyItemText: {
      color: colorSet.disabledText,
      fontSize: 14,
    },
  });
};
