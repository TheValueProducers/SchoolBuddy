import {StyleSheet, Platform, Dimensions} from 'react-native';

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return StyleSheet.create({
    container: {
      zIndex: 99,
      ...Platform.select({
        web: {
          flexDirection: 'row',
        },
      }),
    },
    titleContainer: {
      ...Platform.select({
        web: {
          width: '10%',
          marginRight: 20,
        },
      }),
    },
    title: {
      ...Platform.select({
        web: {
          textAlign: 'right',
        },
        default: {
          marginBottom: windowHeight * 0.01,
          textAlign: 'left',
        },
      }),
      marginTop: windowHeight * 0.01,
      fontSize: windowWidth * 0.04,
      color: colorSet.secondaryText,
      fontWeight: '600',
    },
    selectedItemContainer: {
      ...Platform.select({
        web: {
          width: windowWidth * 0.2,
          borderRadius: 10,
          color: colorSet.secondaryText,
        },
        default: {
          width: '100%',
          borderRadius: 25,
          color: colorSet.primaryText,
        },
      }),
      borderWidth: 1,
      backgroundColor: colorSet.primaryBackground,
      justifyContent: 'center',
      height: windowHeight * 0.06,
      borderColor: colorSet.grey9,
      paddingLeft: windowWidth * 0.04,
    },
    listContainer: {
      width: '100%',
      zIndex: 9999,
    },

    dropdown: {
      ...Platform.select({
        web: {
          borderWidth: 1,
          borderColor: colorSet.grey9,
          width: windowWidth * 0.2,
          borderRadius: 10,
        },
        default: {
          borderRadius: 25,
        },
      }),
      backgroundColor: colorSet.primaryBackground,
      height: 120,
      borderColor: colorSet.primaryText,
      borderWidth: 1,
      overflow: 'hidden',
    },
    overlay: {
      width: '100%',
      height: '100%',
    },

    shadowContainer: {
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: windowWidth * 0.04,
      paddingVertical: windowHeight * 0.0125,
      borderBottomWidth: 0.5,
      borderBottomColor: colorSet.grey3,
    },
    itemText: {
      color: Platform.OS === 'web' ? colorSet.secondaryText : colorSet.grey9,
      fontSize: windowWidth * 0.04,
    },
    checkbox: {
      margin: 8,
    },
  });
};

export default dynamicStyles;
