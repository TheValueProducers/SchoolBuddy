import React, {memo, useEffect, useMemo, useState, useCallback} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  View,
  Text,
  useTheme,
  TouchableIcon,
  useTranslations,
  IconButton,
} from '../../core/dopebase';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {FlatList, Pressable} from 'react-native-gesture-handler';
import {StatusDotSvg} from '../../assets/images/svg';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import Collapsible from 'react-native-collapsible';
import AccordionView from './AccordionView';

const {width, height} = Dimensions.get('window');
const data = [
  {
    khoi: 'Khối 6',
    danhSachLop: [{tenLop: '6A1'}, {tenLop: '6A2'}],
  },
  {
    khoi: 'Khối 7',
    danhSachLop: [{tenLop: '7A3'}, {tenLop: '7A4'}],
  },
  {
    khoi: 'Khối 8',
    danhSachLop: [{tenLop: '8A5'}],
  },
  {
    khoi: 'Khối 9',
    danhSachLop: [{tenLop: '9A6'}],
  },
];

const CustomDrawerContent = props => {
  const {config} = useOnboardingConfig();
  const slides = config.onboardingConfig.menuData;
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const avatarSize = useMemo(() => width * 0.15, []);
  const statusDotSize = useMemo(() => width * 0.07, []);
  const iconSize = useMemo(() => width * 0.07, []);
  const iconCollapseSize = useMemo(() => width * 0.04, []);
  const [isCollapsed, setIsCollapsed] = useState(null);
  const {localized} = useTranslations();

  useEffect(() => {
    const getMoviesFromApi = async () => {
      try {
        const response = await fetch('https://reactnative.dev/movies.json');
        const json = await response.json();
        if (slides && data) {
          slides[3].collapse[1].lopDangDay = data;
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMoviesFromApi();
  }, [slides]);

  const navigateTo = useCallback(
    (navigateData, title) => {
      if (navigateData) {
        props.navigation.navigate(navigateData.name, navigateData.params);
      } else {
        setIsCollapsed(title === isCollapsed ? null : title);
      }
    },
    [isCollapsed, props.navigation],
  );

  const renderItem = useCallback(
    ({item}) => {
      const {title, icon, navigateData, collapse} = item;
      const collapseStatus = title !== isCollapsed;

      return (
        <View>
          <DrawerItem
            label={() => (
              <View>
                <View style={styles.customItem}>
                  <View style={styles.flexRow}>
                    <IconButton
                      tintColor={colorSet.primaryText}
                      source={icon}
                      width={iconSize}
                      height={iconSize}
                    />
                    <Text pl2 h3 style={styles.customItemText}>
                      {title}
                    </Text>
                  </View>
                  {collapse && (
                    <View
                      style={{
                        transform: [
                          collapseStatus ? {rotate: '0deg'} : {rotate: '90deg'},
                        ],
                      }}>
                      <IconButton
                        tintColor={colorSet.primaryText}
                        source={require('../../assets/icons/right-arrow.png')}
                        width={iconCollapseSize}
                        height={iconCollapseSize}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
            onPress={() => navigateTo(navigateData, title)}
            style={styles.drawerItem}
          />
          {collapse && (
            <View mh6 pl6>
              <Collapsible
                collapsed={collapseStatus}
                style={{paddingBottom: height * 0.01}}>
                <AccordionView
                  collapse={collapse}
                  localized={localized}
                  iconCollapseSize={iconCollapseSize}
                  colorSet={colorSet}
                />
              </Collapsible>
            </View>
          )}
        </View>
      );
    },
    [colorSet, iconCollapseSize, iconSize, isCollapsed, localized, navigateTo],
  );

  const DynamicHeader = useCallback(() => {
    return (
      <View
        style={[
          {backgroundColor: colorSet.sixthBackground},
          styles.dynamicHeader,
        ]}>
        <View
          ph4
          pv6
          style={[
            styles.drawerContentHeader,
            {backgroundColor: colorSet.thirBackground},
          ]}>
          <TouchableIcon
            imageStyle={{
              height: avatarSize,
              width: avatarSize,
              borderWidth: 2,
              borderRadius: 1000,
              borderColor: colorSet.secondaryBackground,
              margin: 0,
            }}
            containerStyle={{padding: 0}}
            iconSource={theme.icons.userDefault}
          />
          <View pl2 style={styles.userInfoSection}>
            <Text h3>User Name</Text>
            <Text h4>Xem và chỉnh sửa</Text>
          </View>
        </View>
        <View ph3 style={[styles.drawerContentFooter]}>
          <Pressable style={styles.drawerContentStatus}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StatusDotSvg
                width={statusDotSize}
                height={statusDotSize}
                color={'#B65A46'}
              />
              <Text
                ml1
                style={{width: '75%', fontWeight: '600'}}
                numberOfLines={3}
                h3>
                Bạn đang trong tiết dạy <Text bold>lớp 7A5</Text>
              </Text>
            </View>
            <View>
              <IconButton
                tintColor={colorSet.primaryText}
                source={require('../../assets/icons/right-arrow.png')}
                width={statusDotSize}
                height={statusDotSize}
              />
            </View>
          </Pressable>
        </View>
      </View>
    );
  }, [
    avatarSize,
    colorSet.primaryText,
    colorSet.secondaryBackground,
    colorSet.sixthBackground,
    colorSet.thirBackground,
    statusDotSize,
    theme.icons.userDefault,
  ]);

  return (
    <View style={styles.drawerContent}>
      <DynamicHeader />
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        style={[
          styles.drawerContentScrollView,
          {
            backgroundColor: colorSet.thirBackground,
          },
        ]}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          scrollEnabled={false}
          alwaysBounceVertical={true}
          centerContent={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              mh3
              style={{
                borderBottomWidth: 1,
                opacity: 0.3,
              }}
            />
          )}
          ListFooterComponent={() => <View style={{height: height * 0.02}} />}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  dynamicHeader: {
    height: height * 0.25,
  },
  drawerContentScrollView: {
    flex: 1,
  },
  drawerContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomStartRadius: 20,
  },
  drawerContentFooter: {
    flex: 1,
  },
  drawerContentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoSection: {},
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '115%',
  },
  customItemText: {
    fontWeight: '600',
  },
  drawerItem: {
    paddingLeft: width * 0.01,
  },
});

export default memo(CustomDrawerContent);
