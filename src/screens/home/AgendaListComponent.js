import React from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet} from 'react-native';
import {View, Text, useTranslations, useTheme} from '../../core/dopebase';
import dynamicStyles from './styles';
import {getTimeFuture} from '../../core/helpers/timeFormat';

const AgendaListComponent = props => {
  const {todayData} = props;
  const {theme, appearance} = useTheme();
  const styles = dynamicStyles(theme, appearance);
  const {localized} = useTranslations();
  const colorSet = theme.colors[appearance];

  const _renderItem = ({item, index}) => {
    console.log(item)
    const flag = getTimeFuture(new Date(), item.hour);
    return (
      <View ph5 pv3 br4 style={defaultStyle.itemBackground}>
        <View style={defaultStyle.itemRow}>
          <View>
            <Text h3>Kiểm tra</Text>
          </View>
          <View>
            <Text pv1 ph2 br3 style={defaultStyle.lateText1}>{flag ? "Trong lớp" : "Đã qua"}</Text>
          </View>
        </View>
        <View mt1 style={defaultStyle.itemRow}>
          <View>
            <View style={defaultStyle.itemStatusContainer}>
              <Text pv1 ph2 br3 style={defaultStyle.classText}>
                12A
              </Text>
              <Text pv1 ph2 br3 style={defaultStyle.typeText}>
                Học
              </Text>
              <Text pv1 ph2 br3 style={defaultStyle.doneTextXong}>
                Chưa hoàn thành
              </Text>
            </View>
          </View>
          <View>
            <Text>07:50 am</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View mh5 mv5 style={styles.flexRow}>
        <Pressable>
          <Text h3 style={{fontWeight: '600'}}>
            Lịch dạy
          </Text>
        </Pressable>
        <Pressable>
          <Text h3 style={{fontWeight: '600'}}>
            Kiểm tra
          </Text>
        </Pressable>
        <Pressable>
          <Text h3 style={{fontWeight: '600'}}>
            Đang làm (4)
          </Text>
        </Pressable>
      </View>
      <View mh5 style={{}}>
        <FlatList
          data={todayData.data}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View pv2></View>}
        />
      </View>
    </View>
  );
};

export default AgendaListComponent;

const {width, height} = Dimensions.get('window');

const defaultStyle = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: width * 0.015,
  },
  itemBackground: {
    backgroundColor: '#414446',
  },
  classText: {backgroundColor: '#8F4D1A', color: '#FBE6CF'},
  typeText: {backgroundColor: '#FBE6CF', color: '#8F4D1A'},
  doneTextXong: {backgroundColor: '#DEF5D1', color: '#7D9E6A'},
  doneTextChuaXong: {backgroundColor: '#FFE1E6', color: '#B65A46'},
  lateText1: {backgroundColor: '#A7A7A7', color: '#FFFFFF'},
  lateText2: {backgroundColor: '#E5F554', color: '#000000'},
});
