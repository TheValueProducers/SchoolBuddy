import React from 'react';
import {Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from '../../core/dopebase';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import HeadingBlock from '../../components/HeadingBlock';

const renderItem = ({item}) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View pv4 ph4 style={styles.itemWrap}>
      <Image source={item.icon} style={styles.icon} />
    </View>
    <Text mt1 numberOfLines={1} style={styles.text}>
      {item.text}
    </Text>
  </TouchableOpacity>
);

const QuanLy = ({localized}) => {
  const {config} = useOnboardingConfig();
  const quanLyData = config.onboardingConfig.quanLyData;
  const lichData = config.onboardingConfig.lichData;

  return (
    <>
      <HeadingBlock localized={localized} text={'Lịch'} />
      <FlatList
        data={quanLyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
      <HeadingBlock localized={localized} text={'Quản lý'} />
      <FlatList
        data={lichData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // padding: 10,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: '4%',
  },
  itemContainer: {
    flexBasis: '33.333%', // Adjust this value to fit your needs
    alignItems: 'center',
  },
  itemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#485A249C',
    borderRadius: 20,
  },
  icon: {
    width: 66,
    height: 66,
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
    width: '75%',
  },
});

export default QuanLy;
