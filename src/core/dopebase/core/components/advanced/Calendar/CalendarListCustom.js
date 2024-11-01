import React, {useState, useEffect, memo} from 'react';
import {View} from '../../base/View';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {CalendarList} from 'react-native-calendars';
import calendarIcon from '../../../../../../assets/icons/calendarSm.png';
import {Image} from 'react-native-animatable';

export const CalendarListCustom = memo(props => {
  return (
    <View>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={5}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={6}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
      />
    </View>
  );
});
