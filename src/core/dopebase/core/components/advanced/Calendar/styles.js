import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = (theme, appearance) => {
  const colorSet = theme.colors[appearance];
  return StyleSheet.create({
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {},
    containerActivity: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    indicatorContainer: {
      width: width * 0.275,
      height: width * 0.275,
      borderRadius: 10,
      backgroundColor: 'rgba(52, 52, 52, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    arrow: {
      width: width * 0.05,
      height: width * 0.05,
    },
    calendar: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    header: {
      backgroundColor: colorSet.primaryBackground,
    },
    section: {
      backgroundColor: colorSet.primaryBackground,
      color: 'grey',
    },
    sectionHeaderContainer: {
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.04,
      backgroundColor: colorSet.grey12, // Màu nền mặc định cho tiêu đề
    },
    sectionHeaderText: {
      textTransform: 'capitalize',
      fontSize: width * 0.04,
      fontWeight: 'bold',
    },
    todayHeaderText: {
      backgroundColor: colorSet.thirBackground,
    },
    btnAddTaskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnAddTaskText: {
      color: colorSet.secondaryText,
      fontSize: width * 0.04,
      fontWeight: '650',
    },
  });
};
export default styles;
