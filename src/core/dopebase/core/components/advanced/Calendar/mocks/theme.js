import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window')

export function getTheme(colorSet) {

  return {
    calendarBackground: colorSet.primaryBackground,
    // arrows
    arrowColor: 'black',
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: colorSet.secondaryText,
    // month
    monthTextColor: colorSet.primaryText,
    textMonthFontSize: 16,
    textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold',
    // day names
    textSectionTitleColor: colorSet.primaryText,
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal',
    // dates
    dayTextColor: colorSet.primaryText,
    todayTextColor: colorSet.red,
    // textDayFontSize: 18,
    textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: '500',
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    // selected date
    // selectedDayBackgroundColor: colorSet.thirBackground,
    selectedDayTextColor: colorSet.primaryText,
    // disabled date
    textDisabledColor: colorSet.disabledText,
    // dot (marked date)
    // dotColor: colorSet.primaryText,
    selectedDotColor: colorSet.red,
    disabledDotColor: colorSet.disabledText,
    dotStyle: { marginTop: -2 },
    'stylesheet.calendar.header': {
      dayTextAtIndex0: {
        color: '#FF6347'
      },
      dayTextAtIndex6: {
        color: '#1E90FF'
      }
    }
  };
}
