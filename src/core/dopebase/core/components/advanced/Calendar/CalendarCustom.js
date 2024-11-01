import React, {
  useRef,
  useCallback,
  memo,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {getMarkedDates} from './mocks/agendaItems';
import AgendaItem from './mocks/AgendaItem';
import {getTheme} from './mocks/theme';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {View} from '../../base/View';
import {Text} from '../../base/Text';
import {TouchableIcon} from '../TouchableIcon/TouchableIcon';
import updateDeviceStorage from '../../../../../helpers/updateDeviceStorage';
import {useNavigation} from '@react-navigation/core';

const calendarSmIcon = require('../../../../../../assets/icons/calendarSm.png');
const calendarplusIcon = require('../../../../../../assets/images/menu/calendar-plus.png');

const fetchData = async setItems => {
  try {
    const data = await updateDeviceStorage.getStoreData('agendaItems');
    if (Array.isArray(data)) {
      setItems(data);
    } else {
      setItems([]);
    }
  } catch (error) {
    console.error('Error fetching agenda items:', error);
    setItems([]);
  }
};

export const CalendarCustom = memo(({weekView}) => {
  const [items, setItems] = useState([]);
  const isInitialized = useRef(false);
  const {theme, appearance} = useTheme();
  const styles = useMemo(
    () => dynamicStyles(theme, appearance),
    [theme, appearance],
  );
  const colorSet = theme.colors[appearance];
  const calendarTheme = useRef(getTheme(colorSet));
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const marked = useMemo(() => getMarkedDates(items), [items]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData(setItems);
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      updateDeviceStorage.setStoreData('agendaItems', items);
    } else {
      isInitialized.current = true; // Đánh dấu rằng items đã được khởi tạo
    }
  }, [items]);

  const renderItem = useCallback(
    ({item, section}) => (
      <AgendaItem
        item={item}
        date={section.title}
        switchActive={true}
        updateNotiState={updateNotiState}
      />
    ),
    [items],
  );

  const renderSectionHeader = useCallback(
    item => {
      const isToday = item === today;

      return (
        <View
          style={[
            styles.sectionHeaderContainer,
            isToday && styles.todayHeaderText,
          ]}>
          <Text style={styles.sectionHeaderText}>{item}</Text>
        </View>
      );
    },
    [today, styles],
  );

  const renderListHeader = useCallback(
    () => (
      <TouchableIcon
        iconSource={calendarplusIcon}
        containerStyle={styles.btnAddTaskContainer}
        imageStyle
        renderTitle={true}
        title={`Thêm kế hoạch`}
        titleStyle={styles.btnAddTaskText}
        tintColor={colorSet.secondaryText}
      />
    ),
    [styles, colorSet],
  );

  const updateNotiState = useCallback((date, hour, newState) => {
    const updateItemState = item =>
      item.hour === hour ? {...item, notiState: newState} : item;
    const disableNotiState = item => ({...item, notiState: false});

    const updateSectionState = section => {
      if (section.title === date) {
        return {
          ...section,
          data: section.data.map(updateItemState),
        };
      } else if (section.title < date) {
        return {
          ...section,
          data: section.data.map(disableNotiState),
        };
      }
      return section;
    };

    setItems(prevItems => prevItems.map(updateSectionState));
  }, []);

  return (
    <CalendarProvider
      date={today} // date is string
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: colorSet.red,
      }}
      // todayBottomMargin={16}
      alowShadow={true}>
      {weekView ? (
        <WeekCalendar firstDay={1} markedDates={marked} />
      ) : (
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={calendarTheme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked}
          leftArrowImageSource={calendarSmIcon}
          rightArrowImageSource={calendarSmIcon}
          renderArrow={direction => {
            if (direction === 'right') {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CalendarFullScreen');
                  }}>
                  <Image
                    source={calendarSmIcon}
                    tintColor={colorSet.red}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              );
            } else {
              return <View style={styles.arrow} />;
            }
          }}
          disableArrowLeft={true}
          disableArrowRight={true}
          disableMonthChange={false}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <View style={{flex: 1}}>
        <AgendaList
          sections={items}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          // scrollToNextEvent
          sectionStyle={styles.section}
          // dayFormat={'yyyy-MM-d'}
          scrollEnabled={true}
          ListHeaderComponent={renderListHeader}
        />
      </View>
    </CalendarProvider>
  );
});
