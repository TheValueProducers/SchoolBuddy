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
} from 'react-native-calendars';
import {getMarkedDates} from './mocks/agendaItems';
import AgendaFilterItem from './mocks/AgendaFilterItem';
import {getTheme} from './mocks/theme';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {View} from '../../base/View';
import {Text} from '../../base/Text';
import updateDeviceStorage from '../../../../../helpers/updateDeviceStorage';
import {useNavigation} from '@react-navigation/core';
import {agendaFilter} from '../../../../../../utils/agendaFilter';

const calendarSmIcon = require('../../../../../../assets/icons/calendarSm.png');
const filtersIcon = require('../../../../../../assets/icons/filters-3.png');

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

export const AgendaCustom = memo(props => {
  const {filter, status, grade, subject, selectedStartDate, selectedEndDate} =
    props.route.params;
  const [items, setItems] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
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
    const getFilteredArray = async () => {
      let tempArr = items;
      if (tempArr) {
        if (filter) {
          tempArr = await agendaFilter(filter, tempArr, 'type');
        }
        if (status) {
          tempArr = await agendaFilter(status, tempArr, 'done');
        }
        if (grade) {
          tempArr = await agendaFilter(grade, tempArr, 'grade');
        }
        if (subject) {
          tempArr = await agendaFilter(subject, tempArr, 'subject');
        }
      }
      setFilteredArray(tempArr);
    };
    getFilteredArray();
  }, [
    items,
    filter,
    status,
    grade,
    subject,
    selectedStartDate,
    selectedEndDate,
  ]);

  useEffect(() => {
    if (isInitialized.current) {
      updateDeviceStorage.setStoreData('agendaItems', items);
    } else {
      isInitialized.current = true; // Đánh dấu rằng items đã được khởi tạo
    }
  }, [items]);

  const renderItem = useCallback(
    ({item, section}) => (
      <AgendaFilterItem
        item={item}
        date={section.title}
        switchActive={true}
        updateNotiState={updateNotiState}
        updateDone={updateDone}
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
      <View ph5 pv5 style={styles.listHeader}>
        <Text style={{fontSize: 18}}>Trạng thái</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CalendarFilters');
          }}>
          <Image
            source={filtersIcon}
            tintColor={colorSet.red}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
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

  const updateDone = useCallback((date, hour, newState) => {
    const updateItemState = item =>
      item.hour === hour ? {...item, done: newState} : item;
    const disableState = item => ({...item, done: 'Late'});

    const updateSectionState = section => {
      if (section.title === date) {
        return {
          ...section,
          data: section.data.map(updateItemState),
        };
      } else if (
        section.title < date &&
        section.data.done.includes('CGQ', 'Late', 'In Progress')
      ) {
        return {
          ...section,
          data: section.data.map(disableState),
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
                  navigation.navigate('CalendarScreen');
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
      <View style={{flex: 1}}>
        <AgendaList
          sections={filteredArray}
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
