import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../core/dopebase';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const { width, height } = Dimensions.get('window');

  return StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colorSet.primaryText,
      marginTop: 16,
      fontSize: 18,
    },
    image: {
      height: 128,
      width: 128,
      borderRadius: 64,
      marginTop: -320,
    },
    // Phần này không thuộc template
    headerLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    currentDate: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 21,
    },
    iconCover: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    notiContainer: {
      backgroundColor: colorSet.thirBackground,
      borderRadius: 15,
    },
    notiContent: {
      backgroundColor: colorSet.componentBackground2,
    },
    notiContainerText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    consumWaterText: {
      color: colorSet.primaryText,
    },
    updateAppearanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryForeground,
      gap: width * 0.07,
    },
    tienTrinh: {
      width: "100%",
      height: 10,
      borderRadius: 10,
    },
  })
}

export default dynamicStyles
