import React, {useState, useEffect, memo, useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {CalendarList} from 'react-native-calendars';
import filtersIcon from '../../../../../../assets/icons/filters-3.png';
import {Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/core';

export const CalendarComponent = memo(props => {
  const navigation = useNavigation();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const calendarTheme = useMemo(() => {
    return {
      calendarBackground: colorSet.primaryBackground,
      dayTextColor: colorSet.primaryText,
      monthTextColor: colorSet.primaryText,
      todayTextColor: colorSet.red,
      textDisabledColor: colorSet.disabledText,
      'stylesheet.calendar.header': {
        dayTextAtIndex0: {
          color: 'red',
        },
        dayTextAtIndex6: {
          color: 'blue',
        },
      },
    };
  }, []);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  if (isLoading) {
    return (
      <View fx1 style={styles.containerActivity}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator animating={true} color={'white'} size="medium" />
        </View>
      </View>
    );
  }

  return (
    <CalendarList
      horizontal={false}
      pagingEnabled={false}
      pastScrollRange={3}
      futureScrollRange={3}
      showScrollIndicator={false}
      onDayPress={onDayPress}
      markedDates={{
        [selectedDate]: {selected: true, selectedColor: colorSet.primary},
      }}
      hideExtraDays={false}
      hideArrows={false}
      renderArrow={direction => {
        if (direction === 'right') {
          return (
            <Image
              source={filtersIcon}
              tintColor={colorSet.primaryText}
              style={styles.arrow}
            />
          );
        } else {
          return <View style={styles.arrow} />;
        }
      }}
      disableArrowLeft={true}
      disableMonthChange={true}
      onPressArrowRight={() => {
        navigation.navigate('CalendarFilters');
      }}
      theme={calendarTheme}
    />
  );
});
