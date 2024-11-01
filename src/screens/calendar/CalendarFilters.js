import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Dimensions, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  useTranslations,
  useTheme,
  useActionSheet,
  ActivityIndicator,
  TouchableIcon,
  Button,
} from '../../core/dopebase';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import dynamicStyles from './styles';

import menuIcon from '../../assets/icons/menu1x.png';
import Checkbox from 'expo-checkbox';
import {DropdownPicker} from '../../core/dopebase/forms/components';

export const CalendarFilters = memo(props => {
  const {navigation} = props;
  const {config} = useOnboardingConfig();
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];

  const styles = dynamicStyles(theme, appearance);

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [status, setStatus] = useState([]);
  const [grade, setGrade] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState([]);

  const slideFilterBtn = config.onboardingConfig.CalendarFiltersBtn;
  const slideFiltersCheckboxStatus =
    config.onboardingConfig.CalendarFiltersCheckboxStatus;
  const slideFiltersCheckboxGrade =
    config.onboardingConfig.CalendarFiltersCheckboxGrade;
  const slideFiltersCheckboxSubject =
    config.onboardingConfig.CalendarFiltersCheckboxSubject;

  const onFilterBtnPress = useCallback(
    item => {
      let tempArr = JSON.parse(JSON.stringify(filter));
      if (filter.includes(item)) {
        setFilter(tempArr.filter(x => x !== item));
      } else {
        tempArr.push(item);
        setFilter(tempArr);
      }
    },
    [filter],
  );

  const onCheckBoxPress = useCallback(
    (item, headerTitle) => {
      if (headerTitle === 'Status') {
        let tempArr = JSON.parse(JSON.stringify(status));
        if (status.includes(item)) {
          setStatus(tempArr.filter(x => x !== item));
        } else {
          tempArr.push(item);
          setStatus(tempArr);
        }
      } else if (headerTitle === 'Grade') {
        let tempArr = JSON.parse(JSON.stringify(grade));
        if (grade.includes(item)) {
          setGrade(tempArr.filter(x => x !== item));
        } else {
          tempArr.push(item);
          setGrade(tempArr);
        }
      }
    },
    [status, grade],
  );

  const onSubjectCheckBoxPress = useCallback(
    item => {
      let tempArr = JSON.parse(JSON.stringify(subject));
      if (subject.includes(item)) {
        setSubject(tempArr.filter(x => x !== item));
      } else {
        tempArr.push(item);
        setSubject(tempArr);
      }
    },
    [subject],
  );

  const handleSelectStartDate = useCallback(item => {
    setSelectedStartDate(item);
  }, []);

  const handleSelectEndDate = useCallback(item => {
    setSelectedEndDate(item);
  }, []);

  useEffect(() => {
    if (
      slideFilterBtn &&
      slideFiltersCheckboxStatus &&
      slideFiltersCheckboxGrade &&
      slideFiltersCheckboxSubject
    ) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: localized('Calendar'),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View>
          <TouchableIcon
            imageStyle={{tintColor: colorSet.secondaryText}}
            iconSource={theme.icons.backArrow}
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableIcon
            imageStyle={{tintColor: colorSet.thirBackground}}
            iconSource={menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
        height: height * 0.08,
      },
      headerTintColor: colorSet.secondaryText,
    });
  });

  const _renderItemBtn = useCallback(
    ({item, index}) => {
      return (
        <Button
          key={(item + index).toString()}
          containerStyle={[
            styles.filterButton,
            filter.includes(item.title) && {
              backgroundColor: colorSet.sixthBackground,
            },
          ]}
          textStyle={{color: colorSet.secondText}}
          text={localized(item.title)}
          radius={width * 0.1}
          onPress={() => onFilterBtnPress(item.title)}
          styles={{}}
          loading={false}
        />
      );
    },
    [filter],
  );

  const _renderCheckbox1 = useCallback(
    (item, headerTitle) => {
      const isChecked =
        headerTitle === 'Status'
          ? status.includes(item.title)
          : grade.includes(item.title);

      const handlePress = () => {
        onCheckBoxPress(item.title, headerTitle);
      };

      return (
        <TouchableOpacity onPress={handlePress} style={styles.checkBox1}>
          <Checkbox
            value={isChecked}
            onValueChange={handlePress}
          />
          <Text numberOfLines={1} style={styles.checkboxParagraph}>
            {localized(item.title)}
          </Text>
        </TouchableOpacity>
      );
    },
    [status, grade, localized, onCheckBoxPress],
  );

  const _renderCheckbox2 = useCallback(
    ({item}) => {
      const handlePress = () => {
        onSubjectCheckBoxPress(item.title);
      };
      return (
        <TouchableOpacity onPress={handlePress} style={styles.checkBox2}>
          <Checkbox
            value={subject.includes(item.title)}
            onValueChange={handlePress}
          />
          <Text numberOfLines={1} style={styles.checkboxParagraph2}>
            {localized(item.title)}
          </Text>
        </TouchableOpacity>
      );
    },
    [subject],
  );

  const ListFilterBtn = useCallback(() => {
    return (
      <View ph5>
        <View pt5 pb3>
          <Text h3 style={styles.headerText}>
            {localized('Calendar filters')}
          </Text>
        </View>
        <View style={styles.listButtonContainer}>
          {slideFilterBtn.map((item, index) => {
            return _renderItemBtn({item, index});
          })}
        </View>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideFilterBtn, filter]);

  const ListFilterCheckbox1 = useCallback(
    ({headerTitle, data}) => {
      return (
        <View ph5>
          <FlatList
            scrollEnabled={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => _renderCheckbox1(item, headerTitle)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            ItemSeparatorComponent={() => (
              <View style={{height: height * 0.025}}></View>
            )}
            ListHeaderComponent={({item}) => (
              <View pt5 pb3>
                <Text h3>{localized(headerTitle)}</Text>
              </View>
            )}
            ListHeaderComponentStyle={{width: width}}
          />
        </View>
      );
    },
    [status, grade, localized],
  );

  const ListFilterCheckbox2 = useCallback(
    ({headerTitle, data}) => {
      return (
        <View ph5>
          <FlatList
            scrollEnabled={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderCheckbox2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            ItemSeparatorComponent={() => (
              <View style={{height: height * 0.025}}></View>
            )}
            ListHeaderComponent={({item}) => (
              <View pt5 pb3>
                <Text h3>{localized(headerTitle)}</Text>
              </View>
            )}
            ListHeaderComponentStyle={{width: width}}
          />
        </View>
      );
    },
    [subject, localized],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colorSet.primaryBackground}}>
        <View pb5>
          <ListFilterBtn />
          <ListFilterCheckbox1
            headerTitle={'Status'}
            data={slideFiltersCheckboxStatus}
          />
          <ListFilterCheckbox1
            headerTitle={'Grade'}
            data={slideFiltersCheckboxGrade}
          />
          <ListFilterCheckbox2
            headerTitle={'Subject'}
            data={slideFiltersCheckboxSubject}
          />
          <View pt8 style={{paddingBottom: height * 0.175}}>
            <View ph5>
              <Text h3>{localized('Time')}</Text>
            </View>
            <View ph5 style={[styles.flexRow, styles.dropdownPickerContainer]}>
              <DropdownPicker
                title="Từ"
                items={['09/2024', '10/2024', '11/2024', '12/2024']}
                onSelectItem={handleSelectStartDate}
                allowMultipleSelection={false}
                selectedItemsList={selectedStartDate}
                containerStyle={{flexBasis: '45%'}}
                modalWidth={'40%'}
              />
              <DropdownPicker
                title="Đến"
                items={['09/2024', '10/2024', '11/2024', '12/2024']}
                onSelectItem={handleSelectEndDate}
                allowMultipleSelection={false}
                selectedItemsList={selectedEndDate}
                containerStyle={{flexBasis: '45%'}}
                modalWidth={'40%'}
              />
            </View>
          </View>
          <View ph5 pv5>
            <Button
              onPress={() =>
                navigation.navigate('CalendarResult', {
                  filter: filter,
                  status: status,
                  grade: grade,
                  subject: subject,
                  selectedStartDate: selectedStartDate,
                  selectedEndDate: selectedEndDate,
                })
              }
              text={localized('Apply filter')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
});

const {width, height} = Dimensions.get('window');
